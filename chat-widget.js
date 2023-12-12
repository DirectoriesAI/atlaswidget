(function(options) {
  document.head.insertAdjacentHTML('beforeend', '<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css" rel="stylesheet">');

  // Use the assistantId, atlasApiKey, title, mainColor, and secondaryColor from the options
  const assistantId = options.assistantId;
  const atlasApiKey = options.atlasApiKey;
  const title = options.title || 'Atlas AI User Guide';
  const mainColor = options.mainColor || '#1F2937'; // Default to Tailwind's gray-800
  const secondaryColor = options.secondaryColor || '#FFFFFF'; // Default to white
  // Available logo options with a custom option fallback
  const logoOptions = {
    'atlasBlack': 'atlas-logo.jpeg'
  };
  // Use a custom logo URL if provided, otherwise fallback to 'atlasBlack'
  const logoUrl = options.logoUrl && options.logoUrl !== 'custom' ? logoOptions[options.logoUrl] || 'atlas-logo.jpeg' : options.customLogoUrl || 'atlas-logo.jpeg';
  const initialMessage = options.initialMessage || 'Hello from Atlas';

  // Inject the CSS
  const style = document.createElement('style');
  style.innerHTML = `
  .hidden {
    display: none;
  }
  #chat-widget-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    flex-direction: column;
  }
  #chat-popup {
    height: 70vh;
    max-height: 70vh;
    transition: all 0.3s;
    overflow: hidden;
  }
  @media (max-width: 768px) {
    #chat-popup {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-height: 100%;
      border-radius: 0;
    }
  }
  #chat-header {
    background-color: ${mainColor};
  }
  #chat-submit {
    background-color: ${mainColor};
  }
  #chat-bubble {
    background-color: ${secondaryColor};
  }
  `;

  document.head.appendChild(style);

  // Create chat widget container
  const chatWidgetContainer = document.createElement('div');
  chatWidgetContainer.id = 'chat-widget-container';
  document.body.appendChild(chatWidgetContainer); 
  
  // Inject the HTML
  chatWidgetContainer.innerHTML = `
    <div id="chat-bubble" class="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer text-3xl">
      <img src="${logoUrl}" alt="Atlas Logo" class="w-16 h-16 rounded-full">
    </div>
    <div id="chat-popup" class="hidden absolute bottom-20 right-0 w-96 bg-white rounded-md shadow-md flex flex-col transition-all text-sm">
      <div id="chat-header" class="flex justify-between items-center p-4 text-white rounded-t-md">
        <h3 class="m-0 text-lg">${title}</h3>
        <button id="close-popup" class="bg-transparent border-none text-white cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div id="chat-messages" class="flex-1 p-4 overflow-y-auto">
        ${initialMessage ? `<div class="p-4 text-black">${initialMessage}</div>` : ''}
      </div>
      <div id="chat-input-container" class="p-4 border-t border-gray-200">
        <div class="flex space-x-4 items-center">
          <input type="text" id="chat-input" class="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none w-3/4" placeholder="Type your message...">
          <button id="chat-submit" class="text-white rounded-md px-4 py-2 cursor-pointer">Send</button>
        </div>
        <div class="flex text-center text-xs pt-4">
          <span class="flex-1">Built by <a href="https://twitter.com/aidirectories" target="_blank" class="text-indigo-600">@directoriesai</a></span>
        </div>
      </div>
    </div>
  `;
})(window.chatWidgetOptions || {});

  // Add event listeners
  const chatInput = document.getElementById('chat-input');
  const chatSubmit = document.getElementById('chat-submit');
  const chatMessages = document.getElementById('chat-messages');
  const chatBubble = document.getElementById('chat-bubble');
  const chatPopup = document.getElementById('chat-popup');
  const closePopup = document.getElementById('close-popup');

  chatSubmit.addEventListener('click', function() {
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    chatMessages.scrollTop = chatMessages.scrollHeight;

    chatInput.value = '';

    onUserRequest(message);

  });

  chatInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      chatSubmit.click();
    }
  });

  chatBubble.addEventListener('click', function() {
    togglePopup();
  });

  closePopup.addEventListener('click', function() {
    togglePopup();
  });

  function togglePopup() {
    const chatPopup = document.getElementById('chat-popup');
    chatPopup.classList.toggle('hidden');
    if (!chatPopup.classList.contains('hidden')) {
      document.getElementById('chat-input').focus();
    }
  }  

  async function onUserRequest(message) {
    // Handle user request here
    console.log('User request:', message);
  
    // Display user message
    const messageElement = document.createElement('div');
    messageElement.className = 'flex justify-end mb-3';
    messageElement.innerHTML = `
      <div class="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-[70%]">
        ${message}
      </div>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  
    chatInput.value = '';
  
    // Reply to the user
    if (typeof atlasApiKey === 'undefined' || typeof assistantId === 'undefined') {
      console.error('Error: Atlas API key or assistant ID is not defined.');
      setTimeout(() => {
        reply('Please ensure you have included your Atlas API key and assistant id.');
      }, 1000);
    } else {
      try {
        const response = await fetch('https://run.directories.ai/api/atlas/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': atlasApiKey
          },
          body: JSON.stringify({ prompt: message, assistant_id: assistantId, atlas_api_key: atlasApiKey })
        });
        const data = await response.json();
        if (data && data.reply) {
          reply(data.reply);
        }
      } catch (error) {
        console.error('Error during Atlas API call:', error);
        reply('There was an error processing your request. Please try again later.');
      }
    }
  }
  
  function reply(message) {
    const chatMessages = document.getElementById('chat-messages');
    const replyElement = document.createElement('div');
    replyElement.className = 'flex mb-3';
    replyElement.innerHTML = `
      <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
        ${message}
      </div>
    `;
    chatMessages.appendChild(replyElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
;
