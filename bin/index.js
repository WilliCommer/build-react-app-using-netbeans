#!/usr/bin/env node

/* 
 * Markdown Browser
 * md-browse
 * 
 */

var fs          = require('fs');
var path        = require('path');
var _           = require('lodash');
var opn         = require('opn');
var config      = require('./../config.js');
var fileName, mdContent, htmlContent, output, outputPath;
var test        = false;


// console.log('config: ',config);

/*     process comand line      */

var program = require('commander');

program
  .version('1.0')
  .arguments('<file>')
  .action(function (file) {
    fileName = file;
  });
 
program.parse(process.argv);

if (test) {
  fileName = path.normalize(__dirname + '/../README.md');
} else {
  if (typeof fileName === 'undefined') {
    console.error('no file given!');
    process.exit(1);
  }
}  

console.log('markdown file:', fileName);
console.log('__dirname:', __dirname);


/*     set output path      */

outputPath = config.output ? config.output : '../temp/result.html';
outputPath = path.join(__dirname, outputPath);

/*     resd md file      */

mdContent = fs.readFileSync(fileName,'utf-8');


/*     create html content      */

var hljs = require('highlight.js');
var md = require('markdown-it')({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});
htmlContent = md.render(mdContent); 

/*     create html page from template      */

let filename        = path.basename(fileName,'.md');
let title           = config.title.replace('[filename]', filename);
let highlight_style = config.highlight_style || 'github';
let style           = config.style || 'github';

output = template(htmlContent, {title: title, style: style, highlight_style: highlight_style});

/*     save it to temp folder      */

fs.writeFileSync( outputPath, output, 'utf-8' );

/*     use opn to browse      */

opn(outputPath);

/*     finish exit process      */

//----------------


function template(content, option) {
    if (test) console.log('option: %j', option); 

    let templatePath            = path.join(__dirname, '../template/template.html');
    let title                   = option.title;
    let markdownCssPath         = require.resolve('../styles/' + option.style + '.css');
    let highlightJsThemeCssPath = path.join(require.resolve('highlight.js'), '../../styles/', option.highlight_style + '.css');
    let templateString          = fs.readFileSync(templatePath,'utf-8');
    let githubMarkdownCss       = fs.readFileSync(markdownCssPath,'utf-8');
    let highlightJsThemeCss     = fs.readFileSync(highlightJsThemeCssPath,'utf-8');
    let output = _.template(templateString)({
            title,
            content,
            githubMarkdownCss,
            highlightJsThemeCss
        });
    return output;

}
