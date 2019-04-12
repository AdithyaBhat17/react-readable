import React from 'react'
import { Form, Button, ButtonGroup } from 'react-bootstrap'

export default function Comments ({commentBox, comment, vote_comment, setCommentBox, delete_comment, getDate, edit_comment}) {
    return (
        <div style={{
            display: 'flex', 
            justifyContent: 'space-between',
            boxShadow: '0px 1px 3px 0 rgba(0,0,0,0.07)',
            padding: 10,
            backgroundColor: '#f7f8f3',
            marginBottom: 15,
            borderRadius: 6
        }}>
            <div>
                {!commentBox ? <h6>{comment.body}</h6> : 
                <Form style={{display: 'inline-flex'}} onSubmit={(e) => edit_comment(comment.id, e)}>
                    <Form.Control name="edit" type="text" defaultValue={comment.body} /> &nbsp;
                    <Button style={{backgroundColor: '#f7444e', border: 'none'}} type="submit">
                        Comment
                    </Button>
                </Form>}
                <p><small>by <strong>{comment.author}</strong> on {getDate(comment.timestamp)}</small></p>
                <ButtonGroup>
                    <Button onClick={() => vote_comment(comment.id,'upVote')} style={{backgroundColor: '#78bcc4', border: 'none'}}>
                        <i className="fa fa-thumbs-up"></i>
                    </Button>
                    <Button onClick={() => vote_comment(comment.id,'downVote')} style={{backgroundColor: '#f7444e', border: 'none'}}>
                        <i className="fa fa-thumbs-down"></i>
                    </Button>
                </ButtonGroup> 
                &nbsp;&nbsp;{comment.voteScore}
            </div>
            <div>
                <ButtonGroup>
                    <Button onClick={() => setCommentBox(true)} style={{backgroundColor: '#78bcc4', border: 'none'}}>
                        <i className="fa fa-edit"></i>
                    </Button>
                    <Button onClick={() => delete_comment(comment.id)} style={{backgroundColor: '#f7444e', border: 'none'}}>
                        <i className="fa fa-trash-alt"></i>
                    </Button>
                </ButtonGroup> 
            </div>
        </div>
    )
}