(function (window) {

    let dataInStore = null;
    let intervalId;
    const websocketConnection = function () {
        const ws = new WebSocket("ws://localhost:3000/fetchUpdates");
        ws.onopen = function (evt) {
            console.log("Connection open ...");
            ws.send("Hello WebSockets!");
        };

        ws.onmessage = function (evt) {
            let data = JSON.parse(evt.data);
            console.log(data);
            switch (data.type) {
                case "initial":
                    initTheDataset(data);
                    break;
                case "update":
                    updateTheDataset(data);
                    break;
                default:
                    break;
            }
            setProgressBarInterval();

        };

        ws.onclose = function (evt) {
            console.log("Connection closed.");
        };
    };

    const setProgressBarInterval = function (progress = 0) {
        if(intervalId){
            clearInterval(intervalId);
            intervalId = null;
        }

        intervalId = setInterval(function () {
            progress = progress < 100 ? progress + 1 : 0;
            updateTheProgressBar(progress)
        }, 3600);


        const updateTheProgressBar = function (progress) {
            const $progressBar = $('.progress .progress-bar');
            $progressBar.css({
                width: progress + '%'
            });
        };
    };


    const initTheDataset = function (data) {

        const result = JSON.parse(data.result);
        dataInStore = JSON.parse(data.dataset);
        dataInStore.info = result;

        const projectNameList = Object.keys(result);

        const projectObjectList = projectNameList.map((projectName) => {
            const projectObject = dataInStore["twitter"][projectName];
            return {
                projectName,
                updateNumber: (projectObject != null) ? getNumberOfLatestTwitter(projectObject) : 0,
                updateList: (projectObject != null) ? transferObjectDatasetIntoArray(projectObject) : []
            }
        });

        updateTheContent(projectObjectList);

        showMessage({
            type:"success",
            message: projectNameList.toString()
        })
    };


    const updateTheDataset = function (data) {
        if (Object.keys(data.error).length) {
            showMessage(Object.assign({}, data.error, {type: "error"}));
        }


        const updateProjectNameList = Object.keys(data.data);
        debugger;
        const UpdateProjectObjectList = updateProjectNameList.map((projectName) => {
            const projectObject = data.data[projectName];
            return {
                projectName,
                updateNumber: (projectObject != null) ? getNumberOfLatestTwitter(projectObject) : 0,
                updateList: (projectObject != null) ? transferObjectDatasetIntoArray(projectObject) : []
            }
        });
        updateTheContent(UpdateProjectObjectList);

        showMessage({
            type:"success",
            message: updateProjectNameList.toString()
        })
    };

    const showMessage = function (message) {
        const MESSAGEID = "message-alert";
        const $message = $("#" + MESSAGEID);

        if ($message.length) {
            $message.remove();
        }

        const getMessageObject = function (message) {
            let messageObject = {};
            switch (message.type) {
                case "error":
                    messageObject.className = "alert-danger";
                    messageObject.message = JSON.stringify(message) + "/n" + "可以尝试刷新页面或者重启服务来解决。"+ "/n" + "如果还没有成功，请把错误记录并且联系维护人员;";
                    break;
                case "success":
                    messageObject.className = "alert-success";
                    messageObject.message = "成功同步，更新的项目为" + message.message.toString();
                    break;
                default:
                    messageObject.className = "alert-success";
                    break;
            }
            return messageObject;
        };

        const messageObj = getMessageObject(message);

        const messageDivString = `
                <div class="alert ${getMessageObject(messageObj)}" role="alert" id=${MESSAGEID}>${messageObj.message}</div>
        `;

        const $container = $("container")
            .insertBefore(messageDivString);

    };

    const getNumberOfLatestTwitter = function (projectObject) {
        const ONEDAY = 86400000;
        const projectTimestampsList = Object.keys(projectObject);
        let latestTwitterCount = 0;
        const currentTimestamps = (new Date()).getTime();

        projectTimestampsList.forEach(function (timestamps) {
            if (currentTimestamps - parseInt(timestamps) < ONEDAY) {
                latestTwitterCount += 1;
            }
        });
        return latestTwitterCount;
    };

    const transferObjectDatasetIntoArray = function (projectObject) {

        return Object.keys(projectObject).sort(function (a, b) {
            return -parseInt(a) + parseInt(b);
        }).map(function (key) {
            return projectObject[key];
        })

    };

    const reorderTheDIVAccordingToUpdateCounts = function () {

        let $divs = $(".panel-primary");
        $divs = $divs.sort(function (divA, divB) {
            return divB.dataset.update - divA.dataset.update
        });
        $("#main")
            .remove(".panel-primary")
            .append($divs)

    };




    const updateTheContent = function (projectObjectList) {
        const $mainContainer = $("#main");
        projectObjectList.forEach((projectObject) => {
            const view = generateTheRenderView(projectObject);
            const projectId = "#" + projectObject.projectName;
            //如果已经存在了这个项目，先删除以前的；
            if ($mainContainer.find(projectId).length) {
                $(projectId).remove();
            }
            $mainContainer.append(view);
        });
        reorderTheDIVAccordingToUpdateCounts();
    };


    const generateTheRenderView = function (projectObject) {
        const projectName = projectObject.projectName;
        const updateNumber = projectObject.updateNumber;
        const updateList = projectObject.updateList;
        let twitterUrl = "javascript:void(0);";
        const getTime = (timeString) => {
            return new Date(timeString).getTime();
        };

        try {
            twitterUrl = dataInStore["info"][projectName]["twitter"]["url"];
        } catch (e) {

        }

        const contentView = `
            <div class="panel panel-primary" id=${projectName} data-update=${updateNumber}>
            <div class="panel-heading"><a href=${twitterUrl} target="_blank">${projectName.toUpperCase()}</a>  <span class="badge">${updateNumber}</span></div>
            <div class="panel-body">
                <ul class="list-group">
                    ${(updateList.map((contentElement, index) => {
            if (index >= 5) return "";
            return `<li class="list-group-item" id=${getTime(contentElement.time)}>${contentElement.text} <span>${contentElement.time.split(" ").splice(0, 4).join(" ")}</span></li>`
        })).join(" ")}
                </ul>
            </div>
        </div>
        `;
        return contentView;
    };

    const init = function () {
        websocketConnection();
        setProgressBarInterval();

    };
    init();


}(window));