function listenForClicks(){
    document.addEventListener("click", (e)=>{

        function generateToken(){
            return "";
        }

        function syncing(tabs){
            browser.tabs.sendMessage(tabs[0].id, {
                command: "sync",
                token: generateToken()
            });
        }

        function reportError(error){
            console.log(`ERROR: ${error}`);
        }
    
        if (e.target.classList.contains("Sync")) {
            browser.tabs.query({active: true, currentWindow: true})
              .then(syncing)
              .catch(reportError);
          }

    });
}

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute sync_up content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/sync_up.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);