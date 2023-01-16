export function hello() {
  return "view test"
}

export function add_webview() {
  if(window.chrome.webview){
    let oroginConsoleLog = console.log;
    console.log = function(n){
      oroginConsoleLog(n);
      chrome.webview.hostObjects.Squid.SetStatus(n);
    }
    window.chrome.webview.addEventListener('message', function(e){
      console.log(e.data); 
    });
    console.log("add webview EventListener");
  }else{
    console.log("webview not found");
  }
}

export async function test(w, h, data) {
  await chrome.webview.hostObjects.Squid.MemoryMap.Set(w, h, data);
  await chrome.webview.hostObjects.Squid.CallProcessWithMM("dotnet", "script main.csx")
  let dst = await chrome.webview.hostObjects.Squid.MemoryMap.Read();
  await chrome.webview.hostObjects.Squid.MemoryMap.Clear();
  return dst;
}