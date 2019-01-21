import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw,ContentState } from 'draft-js';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEditor extends Component {
    static propTypes ={
        detail:PropTypes.string
    }
    state = {
        editorState: EditorState.createEmpty(),
    }

    onEditorStateChange= (editorState) => {
        this.setState({
            editorState,
        });
    };
    getContent=()=>{
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    componentWillMount(){
        const detail=this.props.detail
        if(detail){
            const blocksFromHtml = htmlToDraft(detail);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);
            this.state.editorState=editorState
        }

    }
    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
                {/*<textarea*/}
                    {/*disabled*/}
                    {/*value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
                {/*/>*/}
            </div>
        );
    }
}


