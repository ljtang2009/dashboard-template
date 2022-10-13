import { Compiler } from 'webpack';

function outputDate() {
  const date = new Date();
  const dateString = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
  console.log(' ' + dateString);
}

class HelloWorldPlugin {
  public apply(compiler: Compiler) {
    compiler.hooks.done.tap('print-date', (
    ) => {
      outputDate();
    });
  }
}

export default HelloWorldPlugin;
