process.env.BROWSER = "none";

// CracoAntDesignPlugin doc https://github.com/DocSpring/craco-antd
// CracoAntDesignPlugin includes
// "babel-plugin-import"
// "craco-less"
// "less-vars-to-js"

const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./src/styles/antd-custom.less"), "utf8")
);

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        // customizeThemeLessPath: path.join(
        //   __dirname,
        //   "src/styles/antd-custom.less"
        // ),
        // lessLoaderOptions: {
        //   lessOptions: {
        //     // modifyVars: {},
        //     javascriptEnabled: true,
        //   }
        // },
        // cssLoaderOptions: {
        //   modules: { auto: true, localIdentName: "[local]_[hash:base64:5]" }
        // },
        modifyLessRule: (lessRule, ctx) => {
          // console.log('less-rule', lessRule, ctx);
          const updatedRule = {
            test: /\.less$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader",
                options: { 
                  modules: { auto: true, localIdentName: "[local]_[hash:base64:5]" },
                } 
              },
              { 
                loader: "less-loader",
                options: {
                  lessOptions: {
                    javascriptEnabled: true, //This is important!
                    modifyVars: themeVariables
                  }
                }
              }
            ]
          }
          
          return {
            // ...lessRule,
            ...updatedRule
          }
        }
      },
    },
  ],
};
