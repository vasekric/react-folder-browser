import React, { Component } from 'react';
import FolderBrowser from './FolderBrowser'

class App extends Component {
  render() {
    return (
      <div>
          <FolderBrowser path={["root", "portfolio", "bear"]} onPathChange={this.handlePathChange} />
      </div>
    );
  }

  handlePathChange = (path: Array<string>) => {
    console.log("handlePathChange")
    return [
      {
        type: "folder",
        name: "app"
      }, {
      type: "file",
        name: "img.jpg"
    }
    ]
  }
}

export default App;
