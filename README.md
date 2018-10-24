# md-browse

>
> This module adds a cli command to view markdown files in browser without starting a server.
>

Ok, there are many tools to view markdown. 
This one just render the md file to html and open it as file in browser.
It is the ideal tool for readng all that markdown files on disk.


## Installation
    npm install md-browse -g
	
## Usage
    mdbrowse <file>
	
In Windows, right click on a file and chose "_open with_". 
Then select the __mdbrowse.cmd__ in your npm folder as application.
You can retrieve this folder with: ```npm bin -g``` if you don't know.
After that you can open markdown files with double click.

## Configuration

You can set some options in __config.js__ file

```javascript
module.exports = {
  
  style:            "github",
  highlight_style:  "github",
  output:           "../temp/result.html",
  title:            "mdb: [filename]"
  
};

/**
 * see styles in ./styles/CSS Sources.md
 * view highlight styles : https://highlightjs.org/
 * title use a place holder [filename]
 */
```

- __style__ is a css for markdown tags. there are a small collection in _styles_ folder
- __highlight_style__ is the style for syntax highlight
- __output__ is the output file to show in browser
- __title__ is the HTML title where _[filename]_ is a replacer for input file name

