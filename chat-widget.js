(function(options) { 
  // Load Tailwind CSS from CDN

  // Apply the CORS middleware
  // Note: 'app' is not defined in this scope, ensure 'app' is properly initialized before using this middleware
  // app.use(corsMiddleware);
  
  const tailwindCdnUrl = 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css';
  const linkElement = document.createElement('link');
  linkElement.setAttribute('href', tailwindCdnUrl);
  linkElement.setAttribute('rel', 'stylesheet');
  linkElement.setAttribute('data-atlas-api-key', options.atlasApiKey || 'Id2qJHwrVgqtu8AziFmv8XD42cqehid6');
  linkElement.setAttribute('data-atlas-id', options.atlasId || '484b7909-b395-4700-a7b3-02347dbdffae');
  document.head.appendChild(linkElement);

  // Use the atlasId, atlasApiKey, title, mainColor, and secondaryColor from the options
  const prompt = options.prompt;
  const title = options.title || 'Atlas AI User Guide';
  const mainColor = options.mainColor || '#1A1A1A'; // Default to grey-black
  const secondaryColor = options.secondaryColor || '#FFFFFF'; // Default to white
  // Available logo options with a custom option fallback
  const logoOptions = {
    'atlasBlack': 'atlas-logo.jpeg'
  };
  // Use a custom logo URL if provided, otherwise fallback to 'atlasBlack'
  const logoUrl = options.logoUrl && options.logoUrl !== 'custom' ? logoOptions[options.logoUrl] || 'atlas-logo.jpeg' : options.customLogoUrl || 'atlas-logo.jpeg';
  const initialMessage = options.initialMessage || 'Hello from your Atlas Intelligent User Guide. How may I assist your website visitors and community members?';

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
  #chat-input {
    color: #000000; /* Changed from black-700 to #000000 for better visibility */
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
          <span class="flex-1">Built by <a href="https://twitter.com/aidirectories" target="_blank" class="text-indigo-600">@AIdirectories</a></span>
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
  const atlasApiKey = document.querySelector('[data-atlas-api-key]').getAttribute('data-atlas-api-key');
  const atlasId = document.querySelector('[data-atlas-id]').getAttribute('data-atlas-id');

  // Ensure the widget is aware it's embedded and can communicate with the parent page
  const isEmbedded = window.self !== window.top;

  chatSubmit.addEventListener('click', function() {
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    chatMessages.scrollTop = chatMessages.scrollHeight;

    chatInput.value = '';

    onUserRequest(message, atlasApiKey, atlasId);

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

  async function onUserRequest(message, atlasApiKey, atlasId)  {
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

    // Check if atlasApiKey and atlasId are defined
    if (!atlasApiKey || !atlasId) {
      console.error('Error: Atlas API key or atlas ID is not defined.');
      reply('Please ensure you have included your Atlas API key and atlas id.');
      return; // Exit the function if the keys are not defined
    }
    const url = 'https://atlas-py.vercel.app/api';
    const headers = new Headers();
    headers.set('atlas_api_key', atlasApiKey);
    headers.set('Content-Type', 'application/json');// Added Access-Control-Allow-Origin for CORS
    const data = {
      atlas_id: atlasId,
      prompt: message
    };

    // Adjust fetch call to handle CORS when embedded
    const fetchOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
      mode: isEmbedded ? 'no-cors' : 'cors'
      
    };

    fetch(url, fetchOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data && data.reply) {
        reply(data.reply);
      } else {
        throw new Error('No reply received from the API.');
      }
    })
    .catch((error) => {
      console.error('Error during Atlas API call:', error);
      reply('There was an error processing your API request. Please try again later.');
    });
  }

  function reply(message) {
    const chatMessages = document.getElementById('chat-messages');
    const replyElement = document.createElement('div');
    replyElement.className = 'flex mb-3';
    replyElement.innerHTML = `
      <div class="bg-gray-200 text-gray-800 rounded-lg py-2 px-4 max-w-[70%]">
        ${message}
      </div>
    `;
    chatMessages.appendChild(replyElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

