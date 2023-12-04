#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const configFileName = "config.json";
const PAGE_COMPONENT_SUFFIX = "Page";
const TABLE_COMPONENT_SUFFIX = "Table";
const FROM_COMPONENT_SUFFIX = "Form";

const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
];

// The following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.
// If an unsupported method is called, Next.js will return a 405 Method Not Allowed response.

const generateRouteHandlers = (folderPath) => {
  let pageContent = `import { NextRequest, NextResponse } from "next/server";`;

  HTTP_METHODS.forEach((method) => {
    pageContent =
      pageContent +
      `export async function ${method}(req: NextRequest, res: NextResponse) {
        try {
          return NextResponse.json(res);
        } catch (error) {
          return NextResponse.json(
            JSON.stringify({ message: "failure", success: false })
          );
        }      
      }
      `;
  });

  // TODO: figure out how to generate boilerplate for a route
  fs.writeFileSync(path.join(folderPath, "route.ts"), pageContent);
};

const capitalize = (string, callback) => {
  if (callback) {
    const modified = callback(string);
    return modified.charAt(0).toUpperCase() + modified.slice(1);
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};

const generateSubfolderPage = (folderPath, folderName, subfolder) => {
  const subfolderWithoutBrackets = subfolder
    .split("")
    .filter(isBracket)
    .join("");

  const capitalizedResource = capitalize(folderName);
  const capitalizedOperation = capitalize(subfolderWithoutBrackets);
  const componentName =
    capitalizedOperation + capitalizedResource + PAGE_COMPONENT_SUFFIX;

  const pageContent = `
  const ${componentName} = () => {
  return (
    <div>
      <h1 className="text-center">Welcome to the ${componentName}</h1>
    </div>
    );
  };

  export default ${componentName};
  `;

  fs.writeFileSync(path.join(folderPath, "page.tsx"), pageContent);
};

const isBracket = (character) => {
  if (character === "]" || character === "[") {
    return false;
  }

  return true;
};

const generateForm = (folderPath, folderName, subfolder) => {
  const subfolderWithoutBrackets = subfolder
    .split("")
    .filter(isBracket)
    .join("");

  const capitalizedResource = capitalize(folderName);
  const capitalizedAction = capitalize(subfolderWithoutBrackets);

  const componentName =
    capitalizedAction + capitalizedResource + FROM_COMPONENT_SUFFIX;

  const pageContent = `
  "use client";
  const ${componentName} = () => {
    return (
      <>
        <h1 className="text-center">Welcome to the ${componentName}</h1>
        <form></form>
      </>
    );
  };
  
  export default ${componentName};
  
`;

  fs.writeFileSync(path.join(folderPath, `${componentName}.tsx`), pageContent);
};

const generateTable = (folderPath, folderName) => {
  const capitalizedResource = capitalize(folderName);
  const componentName = capitalizedResource + TABLE_COMPONENT_SUFFIX;

  const pageContent = `
  "use client";
  const ${componentName} = () => {
    return (
      <>
        <h1 className="text-center">Welcome to the ${componentName}</h1>
        <table>
          <thead></thead>
          <tbody></tbody>
        </table>
      </>
    );
  };
  
  export default ${componentName};
`;

  fs.writeFileSync(path.join(folderPath, `${componentName}.tsx`), pageContent);
};

const generatePage = (folderPath, folderName) => {
  const capitalizedResource = capitalize(folderName);
  const componentName = capitalizedResource + PAGE_COMPONENT_SUFFIX;

  const pageContent = `
  const ${componentName} = () => {
  return (
    <div>
      <h1 className="text-center">Welcome to the ${componentName}</h1>
    </div>
    );
  };

  export default ${componentName};
  `;

  fs.writeFileSync(path.join(folderPath, "page.tsx"), pageContent);
};

const generateFolderStructure = (rootPath, folderName) => {
  const subfolders = ["create", "[update]"]; // Add more folders as needed

  generatePage(rootPath, folderName);
  generateTable(rootPath, folderName);

  subfolders.forEach((subfolder) => {
    const subfolderPath = path.join(rootPath, subfolder);

    if (!fs.existsSync(subfolderPath)) {
      fs.mkdirSync(subfolderPath);
    }

    generateSubfolderPage(subfolderPath, folderName, subfolder);
    generateForm(subfolderPath, folderName, subfolder);
  });

  console.log(`Folder structure generated in: ${rootPath}`);
};

const getConfig = () => {
  const configPath = path.resolve(process.cwd(), configFileName);

  if (fs.existsSync(configPath)) {
    const configFileContent = fs.readFileSync(configPath, "utf-8");
    const config = JSON.parse(configFileContent);
    return { rootPath: path.resolve(process.cwd(), config.rootPath) };
  }

  return { rootPath: process.cwd() };
};

const main = () => {
  const folderName = process.argv[2];
  const { rootPath } = getConfig();

  if (!folderName) {
    console.error("Please provide a folder name.");
    process.exit(1);
  }

  const fullPath = path.resolve(rootPath, folderName);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath);
  }

  generateFolderStructure(fullPath, folderName);

  const apiPath = path.resolve(rootPath, `api/${folderName}`);
  if (!fs.existsSync(apiPath)) {
    fs.mkdirSync(apiPath);
  }

  generateRouteHandlers(apiPath, folderName);
};

main();
