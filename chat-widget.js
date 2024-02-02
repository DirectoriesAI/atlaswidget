(function(options) {
  // Create an iframe for the chat widget
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'border: none; position: fixed; bottom: 20px; right: 20px; width: 350px; height: 600px; z-index: 1000;';
  document.body.appendChild(iframe);

  // Set the source of the iframe to the chat widget HTML page with query parameters
  const defaultOptions = {
    atlasApiKey: 'Id2qJHwrVgqtu8AziFmv8XD42cqehid6',
    atlasId: '484b7909-b395-4700-a7b3-02347dbdffae'
  };
  const queryParams = new URLSearchParams(Object.assign({}, defaultOptions, options)).toString();
  iframe.src = `chat-widget.html?${queryParams}`;

  // Load Tailwind CSS into the parent document
  const tailwindCdnUrl = 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css';
  const linkElement = document.createElement('link');
  linkElement.href = tailwindCdnUrl;
  linkElement.rel = 'stylesheet';
  document.head.appendChild(linkElement);

  // Inject custom styles into the parent document
  const style = document.createElement('style');
  const mainColor = options.mainColor || '#1A1A1A';
  const secondaryColor = options.secondaryColor || '#FFFFFF';
  style.textContent = `
    .hidden { display: none; }
    #chat-widget-container { position: fixed; bottom: 20px; right: 20px; flex-direction: column; }
    #chat-popup { height: 70vh; max-height: 70vh; transition: all 0.3s; overflow: hidden; }
    @media (max-width: 768px) {
      #chat-popup { position: fixed; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%; max-height: 100%; border-radius: 0; }
    }
    #chat-header { background-color: ${mainColor}; }
    #chat-submit { background-color: ${mainColor}; }
    #chat-bubble { background-color: ${secondaryColor}; }
    #chat-input { color: #000000; }
  `;
  document.head.appendChild(style);
})(window.chatWidgetOptions || {});
    togglePopup();

  function togglePopup() {
    const chatPopup = document.getElementById('chat-popup');
    chatPopup.classList.toggle('hidden');
    if (!chatPopup.classList.contains('hidden')) {
      document.getElementById('chat-input').focus();
    }
  } 

  import { corsHeaders } from './_shared/cors.ts';

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
    const headers = new Headers({
      ...corsHeaders,
      'apikey': atlasApiKey,
      'Content-Type': 'application/json'
    });
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

