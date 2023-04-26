# Embeddable Web Chat Widget


### Built with ChatGPT (GPT-4)

About 95% of the code for this widget is written by GPT-4, I just edited and adjust a few things

###  No external dependencies, pure javascript

A simple and responsive chat widget built with HTML, CSS, and JavaScript. The chat widget is styled using the popular CSS framework, Tailwind CSS (v2), and can be easily integrated into any website with a simple script tag.

[mobile.webm](https://user-images.githubusercontent.com/1721988/234564696-4b3e1b6c-5233-4b95-b49d-f58b0ff186f5.webm)
[desktop.webm](https://user-images.githubusercontent.com/1721988/234564751-534f08e0-a83a-43e4-8585-a3bfe9d4c28c.webm)


## Features

- Responsive design
- Smooth animations and transitions
- Easily customizable
- Lightweight and dependency-free

## TODO

- Replace Tailwind with a custom CSS file
- Session Persistance
- Ajax mechanism to send and receive messages

## Installation

To install the chat widget, follow these steps:

1. Copy the `chat-widget.js` file into your project directory.

2. Add the following script tag to the `<head>` section of your HTML document:

```
<script async src="./chat-widget.js"></script>
```

## Usage & Customization

- The code is quite straight forward and easy to follow, you can easily modify it to suit your needs.

- Messages are passed to the `onUserRequest` function, where you can handle user requests and provide appropriate replies. Use the `reply` function to display responses in the chat popup.

- For visual customization, you can directly make changes to the css or you can also replace the Tailwind CSS classes with your own custom CSS classes or inline styles.

## Demo

Here's a live demo of the chat widget:

[Chat Widget Demo](https://anantrp.github.io/chat-widget)

## Contributing

Contributions are welcome! If you find a bug, have a feature request, or want to improve the chat widget, please feel free to open an issue or create a pull request.

## License

This project is open-source and available under the [MIT License](https://choosealicense.com/licenses/mit/).