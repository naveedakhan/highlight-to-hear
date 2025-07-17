chrome.commands.onCommand.addListener((command) => {
  if (command === "read_selection") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          const selectedText = window.getSelection().toString();
          if (selectedText) {
            const utterance = new SpeechSynthesisUtterance(selectedText);
            speechSynthesis.speak(utterance);
          } else {
            alert("Please select some text first.");
          }
        }
      });
    });
  }
});
