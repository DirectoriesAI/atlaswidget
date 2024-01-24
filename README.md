Atlas AI Interactive Chat Widget - Secure Embedding Instructions
To securely embed the Atlas AI Chat Widget into your website, ensure your site is served over HTTPS and include the following script tag in your HTML:
```html
<script src="https://atlas-py.vercel.app/chat-widget.js" data-atlas-api-key="YOUR_ATLAS_API_KEY" data-assistant-id="YOUR_ASSISTANT_ID" async></script>
```
Make sure to replace `YOUR_ATLAS_API_KEY` and `YOUR_ATLAS_ID` with your actual Atlas API key and Assistant ID respectively. For additional security, do not expose your API keys in the frontend code; instead, use environment variables or server-side integration to inject these values.
