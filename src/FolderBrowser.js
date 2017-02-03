import "react-mdl/extra/material.css"
import "react-mdl/extra/material.js"
import React, {Component} from "react"
import {Grid, Cell, Card, CardTitle, Icon, IconButton, Button, DataTable, TableHeader} from "react-mdl"
import "./FolderBrowser.css"

interface Props {
  path: Array<string>;
  onPathChange: (path: Array<String>) => Array<Entity>;
  onFileUpload: (files: FileList) => Array<Entity>;
}

export interface Entity {
  name: string;
  type: "folder"|"file";
  contentType?: string;
  size?: string;
  lastModified: string;
}
interface State {
  content: Array<Entity>;
  path: Array<string>;
}

class FolderBrowser extends Component<Props, State> {
  state = {
    path: [],
    content: []
  }
  fileInput: Element = null

  render() {
    return (
      <Grid>
        <Cell col={12}>
          <Card shadow={0} className="mdl-cell mdl-cell--12-col">
            <CardTitle expand className="darker">
              <Grid style={{width: '100%'}}>
                <Cell col={10}>
                  <div>
                  {this.state.path.map((folder, index) => (
                    <span key={index}>
                      <Icon name="chevron_right" />
                      <span onClick={this.goBackTo.bind(this, folder, index)}>{folder}</span>
                    </span>
                  ))}
                  </div>
                </Cell>
                <Cell col={1}>
                  <Button onClick={() => this.fileInput.click()} raised>Upload file</Button>
                  <input ref={(item) => {
                    this.fileInput = item
                    this.fileInput.addEventListener("change", this.handleFileInputChange)
                  }} type="file" hidden multiple/>
                </Cell>
                <Cell col={1}>
                <IconButton name="create_new_folder" />
                </Cell>
              </Grid>
            </CardTitle>
            <div>
              <DataTable selectable rowKeyColumn="name" rows={this.state.content}>
                <TableHeader name="name" cellFormatter={this.renderNameCell}>Name</TableHeader>
                <TableHeader numeric name="size">Size</TableHeader>
                <TableHeader name="type">Type</TableHeader>
                <TableHeader name="lastModified">Last Modified</TableHeader>
              </DataTable>
            </div>
          </Card>
        </Cell>
      </Grid>
    )
  }

  renderNameCell = (name: string) => {
    return <a className="a" onClick={this.goForwardTo.bind(this, name)}>{name}</a>
  }

  componentWillMount() {
    const path = this.props.path
    const content = this.props.onPathChange(path)
    this.setState({path, content})
  }

  goBackTo(folder: string, index: number) {
    const path = this.state.path.slice(0, index+1)
    this.setState({path})
  }

  goForwardTo(folder: string) {
    const path = this.state.path
    path.push(folder)
    this.setState({path})
  }

  handleFileInputChange = (event: Event) => {
    const files = event.target.files
    const content = this.props.onFileUpload(files)
    this.setState({content})
  }
}

// TODO:
// FolderBrowser.propTypes = {
//   path: PropTypes.arrayOf(PropTypes.string).isRequired,
//   content: PropTypes.arrayOf(PropTypes.object).isRequired,
// }

export default FolderBrowser
