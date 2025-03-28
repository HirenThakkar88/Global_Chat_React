<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
<a href="https://github.com/HirenThakkar88/Global_Chat_React">
  <img src="https://raw.githubusercontent.com/HirenThakkar88/Global_Chat_React/8b7891f550eb2ba2ba845f15208eb5f3e165f6ee/global_chat/public/Global_Chat_Logo.png" alt="site-logo" width="300" height="142">
</a>

  <h3 align="center">Global Chat Real Time Chatting</h3>

  <p align="center">
    An innovative global chatting platform for seamless communication and connections.
    <br />
    <a href="https://github.com/HirenThakkar88/Global_Chat_React"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/HirenThakkar88/Global_Chat_React/archive/refs/heads/master.zip">Download ZIP</a>
    ·
    <a href="https://github.com/HirenThakkar88/Global_Chat_React/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/HirenThakkar88/Global_Chat_React/issues?q=feature-request---.md">Request Feature</a>
  </p>
</div>

</br>
</br>
</br>

<!-- TABLE OF CONTENTS -->

### 🧭 Navigations for exploration

---

<p align="center">
  <a href="#-about-the-project">📌 About The Project</a> • 
  <a href="#-key-features">✨ Key Features</a> • 
  <a href="#%EF%B8%8F-built-with">🛠️ Built With</a> • 
  <a href="#-ui-design">🎨 UI Design</a> • 
  <a href="#-getting-started">🚀 Getting Started</a> 
</p>

<p align="center">
  <a href="#-prerequisites">📋 Prerequisites</a> • 
  <a href="#-installation">📦 Installation</a> • 
  <a href="#%EF%B8%8F-running-the-project">▶️ Running the Project</a> • 
  <a href="#-usage">💡 Usage</a> • 
  <a href="#-contributing">🤝 Contributing</a> • 
  <a href="#-contact">📧 Contact</a> 
</p>

---


</br>
</br>
</br>

<!-- ABOUT THE PROJECT -->

## 📌 About The Project

"Global Chat" is a real-time chat application built with React. It allows users to easily communicate with each other through one-on-one and group chats. The app has a simple and clean interface, making it easy to use for casual or team conversations.

The project consists of two components within one project directory **Global Chat**:

1. **backend**

   - An **Express.js** project utilizing **WebSockets** and APIs for real-time collaboration.

2. **global-chat(frontend)**
   - A **React.js** project built with **Tailwind** for UI styling and API integration.

</br>

[![Project Overview][product-screenshot]]()

</br>

## ✨ Key Features

- **Global Real-Time Chatting:** Instantly connect with users worldwide through real-time messaging.
- **Voice & Video Calls:** High-quality voice and video calls for seamless communication.
- **Media Sharing:** SShare photos and multimedia files effortlessly.
- **Real-Time Communication:** Use WebSocket technology for instant updates and seamless interaction.
- **Interactive & Engaging:** Smart notifications, message reactions, and customizable chat themes.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🛠️ Built With

This section list all the technologies used for building the web application.

- [![React][React]][React-url]
- [![Vite][Vite]][Vite-url]
- [![Tailwind CSS][Tailwind CSS]][Tailwind-url]  
- [![Express.js][Express]][Express-url]
- [![MongoDB][MongoDB]][MongoDB-url]
- [![API][API]][API-url]
- [![WebSockets][WebSockets]][WebSockets-url]
- [![Node.js][NodeJS]][NodeJS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🎨 UI Design

The user interface of "Global Chat" is designed for a seamless and engaging communication experience. With real-time messaging, voice and video calls, and media sharing, users can connect effortlessly across the world. The intuitive design ensures smooth navigation and an interactive chatting experience.

You can explore the complete UI design on Figma using the link below:

[![Figma Design Link](https://img.shields.io/badge/Figma-UI%20Design-ff69b4?style=for-the-badge&logo=figma)](https://www.figma.com/design/lP9CsVGpjPW6xlWH2sqgXz/GlobalChat_FInal_Design?node-id=17-3668&t=ofgI2EIN7Y3zZ5wY-1)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 🚀 Getting Started

Follow these instructions to set up and run the **Global Chat** project locally.

---

### 📋 Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js & npm**
  - Download and install [Node.js](https://nodejs.org/) (npm comes with Node.js).
  - Verify installation:
    ```sh
    node -v
    npm -v
    ```
- **MongoDB** (Local or Cloud)

  - Install [MongoDB](https://www.mongodb.com/try/download/community) for local use.
  - Alternatively, use **MongoDB Atlas** for a cloud database.
  - Start MongoDB locally:
    ```sh
    mongod
    ```

- **Git**
  - Download and install [Git](https://git-scm.com/downloads).
  - Verify installation:
    ```sh
    git --version
    ```

---

### 📦 Installation

_Follow these steps to install and run the project locally:_

1. **Clone the repository:**

   ```sh
   git clone https://github.com/HirenThakkar88/Global_Chat_React.git
   ```

   ```sh
   cd global_chat #(Change name According to you folder name)
   ```

2. **Install Dependencies for Both Backend and Frontend:**

   ```sh
   npm i #or npm install
   ```

3. **Configure MongoDB Connection:**

   - create .env file in your backend folder 
   - Paste these code into your .env file
   - sample file for reference :

     ```.env
     MONGODB_URI= your MongoDB URI
     PORT=5001

     JWT_SECRET = your secret key
     NODE_ENV = development

     #create Clounary account for photo store paste your api key here
     CLOUDINARY_CLOUD_NAME= your cloud name
     CLOUDINARY_API_KEY= your cloud api key
     CLOUDINARY_API_SECRET= your cloud secret key
     ```
---

### ▶️ Running the Project

After completing all setup steps, start both the **backend** and **frontend**:

```sh
npm run start
```

Your **Global Chat** project should now be running locally! 🚀

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## 💡 Usage

"Global Chat" is designed to enhance real-time communication and global connectivity. Here are some key use cases:

- **Instant Messaging:**

  - Engage in seamless real-time chats with users worldwide.
  - Create group conversations or connect one-on-one effortlessly.

- **Voice & Video Calls:**

  - Initiate high-quality voice and video calls for a more interactive experience.
  - Enjoy smooth, low-latency communication across devices.

- **Media & File Sharing:**

  - Share photos, videos, and documents instantly within chats.
  - Experience secure and efficient media transfers.

- **Global Connectivity:**

  - Connect with people across different regions in a single platform.
  - Enjoy an intuitive and user-friendly chat experience.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## 📧 Contact

Maintenance Team:

- **Popat Hiren** - [hirenthakkar2758@gmail.com](mailto:hirenthakkar2758@gmail.com)
- **Vatsal Suliya** - [vsuliya828@rku.ac.in](mailto:vsuliya828@rku.ac.in)
- **Jigar Kalariya** - [klimbasiya667@rku.ac.in](mailto:klimbasiya667@rku.ac.in)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[logo]: https://raw.githubusercontent.com/HirenThakkar88/Global_Chat_React/8b7891f550eb2ba2ba845f15208eb5f3e165f6ee/global_chat/public/Global_Chat_Logo.png
[contributors-shield]: https://img.shields.io/github/contributors/HirenThakkar88/Global_Chat_React.svg?style=for-the-badge
[contributors-url]: https://github.com/HirenThakkar88/Global_Chat_React/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/HirenThakkar88/Global_Chat_React.svg?style=for-the-badge
[forks-url]: https://github.com/HirenThakkar88/Global_Chat_React/network/members
[stars-shield]: https://img.shields.io/github/stars/HirenThakkar88/Global_Chat_React.svg?style=for-the-badge
[stars-url]: https://github.com/HirenThakkar88/Global_Chat_React/stargazers
[issues-shield]: https://img.shields.io/github/issues/HirenThakkar88/Global_Chat_React.svg?style=for-the-badge
[issues-url]: https://github.com/HirenThakkar88/Global_Chat_React/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/hiren-thakkar-006574318/
[product-screenshot]: /global_chat/public/Thumbnail.png
[React]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black
[React-url]: https://react.dev/
[Vite]: https://img.shields.io/badge/Vite-FDCB58?style=for-the-badge&logo=vite&logoColor=black
[Vite-url]: https://vitejs.dev/
[Tailwind CSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white  
[Tailwind-url]: https://tailwindcss.com/  
[Express]: https://img.shields.io/badge/Express.js-303030?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[API]: https://img.shields.io/badge/API-FF5733?style=for-the-badge&logo=fastapi&logoColor=white
[API-url]: #
[WebSockets]: https://img.shields.io/badge/WebSockets-0085CA?style=for-the-badge&logo=socket.io&logoColor=white
[WebSockets-url]: https://socket.io/
[NodeJS]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/
