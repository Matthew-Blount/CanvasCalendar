(function(){
    if(window.hasRun){
        return;
    }

    windown.hasRun = true;

    function generateAssignments(token){
        var baseURL = "https://canvas.instructure.com/api/v1/";
        var authHeader = {"Authorization": "Bearer "+token};
    }

    function generateEventList(assignments){
        var events = [];
        for(a in assignments){
            if(a["assignment"]["has_submitted_submissions"])
                continue;
            var start = new Date(a["assignment"]["due_at"]);
            start.setMinutes(start.getMinutes()-30);
            var new_event = {
                'summary' : a["context_name"] + ":" + a["title"] +" due",
                'start' : {
                    'dateTime' : start.toISOString().replace("Z",""),
                    'timeZone' : "Etc/GMT"
                },
                'end' : {
                    'dateTime' : a["assignment"]["due_at"].replace("Z", ""),
                    'timeZone' : "Etc/GMT"
                }
            };
            events.push(new_event);
        }
        return events;
    }

    browser.runtime.onMessage.addListener((message)=>{
        if(message.command=="sync"){
            console.log("Hello");
            //var events = generateEventList(generateAssignments(message.token));
        }
    });
})();