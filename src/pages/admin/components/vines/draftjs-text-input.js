import React, { Component, Fragment } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import createSingleLinePlugin from 'draft-js-single-line-plugin';

const singleLinePlugin = createSingleLinePlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

class DraftJSTextInput extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    hasFocus: false
  }
  onChange = (editorState) => {
    if (this.props.onChange) this.props.onChange(editorState);
    this.setState({ editorState });
  }
  render() {
    const { editorState, hasFocus } = this.state;
    const { multiline } = this.props;

    let plugins = [inlineToolbarPlugin];
    let props = {};
    if (!multiline) {
      plugins = [inlineToolbarPlugin, singleLinePlugin];
      props = { blockRenderMap: singleLinePlugin.blockRenderMap };
    }

    return (
      <Fragment>
        <div className={`draft-text-input ant-input ${hasFocus && "focus"}`}>
          <Editor
            onFocus={() => this.setState({ hasFocus: true })}
            onBlur={() => this.setState({ hasFocus: false })}
            editorState={editorState}
            onChange={this.onChange}
            plugins={plugins}
            {...props}
          />
        </div>
        <InlineToolbar />
      </Fragment>
    );
  }
}

DraftJSTextInput.defaultProps = {
  multiline: false
}

export default DraftJSTextInput;