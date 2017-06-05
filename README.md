# Ng4AspNetCore.StarterWeb #

*NOTE: This repo is very much a work in progress - pull reqeusts are welcomed and appreciated!*

*DISCLAIMER: I work for Microsoft, but am no way affiliated with the .NET Core or Azure AD B2C teams. This is just a starter project I've created to help accelerate getting my side projects up-and-running.*

This repo contains a .NET Core project template with the following components:

1. [Angular 4 front-end](https://angular.io/)
2. [Asp.Net Core server side website](https://docs.microsoft.com/en-us/aspnet/core/)
3. [Microsoft Authentication Library for JS (MSAL)](https://github.com/AzureAD/microsoft-authentication-library-for-js) and a stub of an auth service to ease the pain with authenticating against Azure AD B2C. *NOTE: Stub is based on [this sample](https://github.com/Azure-Samples/active-directory-b2c-javascript-singlepageapp-dotnet-webapi) from Azure AD B2C team.*

### Getting Started ###

Before cloning/forking/downloading, I strongly encourage you to read the post by [Sayed I. Hashimi](https://twitter.com/sayedihashimi) which outlines the process of creating new .NET Core project templates: [How to create your own templates for dotnet new](https://blogs.msdn.microsoft.com/dotnet/2017/04/02/how-to-create-your-own-templates-for-dotnet-new/). After reading that post, you'll have a better understanding of what's going on below as well as how to make your own templates and/or help make this one better.

### Local Installation ###

Follow the steps below to install this project template locally:

1. Ensure you have Asp.Net Core installed locally. If you don't, visit the following link to get it setup: [Get Started with .NET Core](https://www.microsoft.com/net/core)
2. Clone this repo or download the zip and unzip
3. Open a command prompt and change directories to the location to which you just cloned/unzipped the code.
4. Run the following command (adjust the path to ensure you're correctly targeting the folder containing the .template.config folder) :
````
dotnet new --install Ng4AspNetCore.StarterWeb
````
5. Now, to create a project from the newly installed template, change directories to the parent folder of where you want to create the new project and run the following command:
````
dotnet new ng4aspnetcore -n <name of new project>
````
6. Now change directories to the newly created project folder and run the following commands:
````
dotnet restore
npm install
````
7. You're now ready to run the application. You can do this by opening the project in Visual Studio and debugging or via command line (if you're running on Linux or MacOS check out [this page](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/environments) for the command to set the environment):
````
set ASPNETCORE_ENVIRONMENT=Development
dotnet run
````

### Setting Up Azure AD B2C ###

To configure Azure AD B2C, you'll need to ensure you've completed the following:

1. [Created an Azure AD B2C Tenant](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-get-started)
2. [Registered your application](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-app-registration)
3. [Created appropriate B2C policies](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-reference-policies)

Once the steps above are complete, update the appsettings.json with the values from your Azure AD B2C tenant, application, and policies.