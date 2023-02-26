
import React from 'react'
import { useState, useEffect } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { BsReplyFill } from "react-icons/bs";
import { HiUser } from "react-icons/hi"
import { Link } from 'react-router-dom';
import { FiMinimize2, FiMaximize2, FiEye } from 'react-icons/fi'
import { RxDotFilled } from 'react-icons/rx'
import parse from 'html-react-parser';
import moment from 'moment/moment';
import { Tooltip } from 'react-tooltip'


function Comments({ comments, postAuthor }) {
    return (<Tree data={comments} postAuthor={postAuthor} />)
}
function Tree({ data, postAuthor }) {
    return (
        <div className='md:mb-3 mx-3'>
            {data.map(rootNode => (
                // console.log(rootNode)
                (rootNode.author) && <TreeNode key={rootNode.id} id={rootNode.id} node={rootNode} indent={0} isRoot={true} parent={null} parentName={null} postAuthor={postAuthor} />
            ))}
        </div>
    );
}

function TreeNode({ id, node, indent, isRoot, parent, parentName, postAuthor }) {
    const [showChildren, setShowChildren] = useState(true);
    const [parentEl, enableAnimations] = useAutoAnimate();
    const [hiddenRepliesCount, sethiddenRepliesCount] = useState();

    function showHideChildren(replies_id) {
        let replies = document.querySelector(`.replies-${replies_id}`);
        if (replies.classList.contains("hidden")) {
            // Remove the hidden class
            replies.classList.remove("hidden");
            document.querySelector(`.comment-${replies_id}`).classList.remove("bg-blue-200")
            // Set the hidden replies to null
            sethiddenRepliesCount();
        }
        else if (replies.childElementCount > 0) {
            document.querySelector(`.comment-${replies_id}`).classList.add("bg-blue-200")
            // Add the "hidden" class
            replies.classList.add("hidden");
            // Set the hidden replies to the number of replies
            sethiddenRepliesCount(replies.childElementCount)
        }
        ;
    }

    function getParent(parent_id) {

        document.querySelector(`[data-parent-id='parent-${parent_id}']`).children[0].children[1].classList.remove("animate-pulse-once")
        document.querySelector(`[data-parent-id='parent-${parent_id}']`).children[0].children[1].parentElement.children[0].scrollIntoView(
            {
                behavior: 'smooth',
                block: 'nearest'
            }
        );
        document.querySelector(`[data-parent-id='parent-${parent_id}']`).children[0].children[1].classList.add("animate-pulse-once");
    }

    return (
        <div className={
            // Render the comments container
            (!isRoot) ? `comment-container comment-${id} inner-comment-shadow ml-3 border border-b-0 border-r-0 border-black hover:cursor-default`
                : `comment-container root-shadow comment-${id}
            border border-black mt-3  hover:cursor-default`} data-parent-id={`parent-${id}`} ref={parentEl}>

            {/* Render the comment's headers and text */}
            {(node.author && node.text) &&
                <div className='content py-3 ' /**onClick={() => showHideChildren(id)}**/>
                    <div className='headers text-blue-900 md:text-xs text-sm font-bold w-full px-3 py-1 flex items-center '>
                        <div className='flex flex-1 items-center'>
                            {(node.author === postAuthor) ? <><HiUser className='mr-1' /> {node.author}</> : node.author}{(parentName) && <> <BsReplyFill className='mx-1' /> <span className={`hover:cursor-pointer hover:underline`}
                                onClick={() => getParent(parent, parentName)}>{(parentName === postAuthor) ? <><HiUser className='mr-1 inline' /> {parentName}</> : parentName}</span></>}
                                <RxDotFilled className='mx-1' />
                                <span>{moment(node.created_at).fromNow()}</span>
                                
                                </div>
                    </div>
                    <CommentText>{node.text}</CommentText>
                    <div className='flex w-full justify-end'>
                        <div className='items-center flex w-fit mr-3 md:text-sm text-gray-700' onClick={() => showHideChildren(id)}>
                            {
                                //Checks to see if hiddenRepliesCount(int) is truthy
                                (hiddenRepliesCount) ?
                                    //Show the "Show [hiddenRepliesCount]" button
                                    (<div className='flex font-normal hover:cursor-pointer items-center border border-gray-800 py-1 px-5 rounded-full my-3 ' >
                                        <FiMaximize2 className='text-xl mr-2 ' />
                                        expand thread [{hiddenRepliesCount} more]</div>
                                    )
                                    :
                                    // Else: Checks to see if the element we clicked on has any replies and if it does, show the 'hide replies button'
                                    ((document.querySelector(`.replies-${id}`)) && document.querySelector(`.replies-${id}`).childElementCount > 0) && <div className='flex font-normal hover:cursor-pointer items-center border border-gray-800 py-1 px-5 rounded-full my-3 '>
                                        <FiMinimize2 className='text-xl mr-2' />
                                        collapse thread</div>
                            }
                        </div>
                    </div>

                </div>
            }
            {/* Recursively show the comments in a tree format. */}
            <div className={`replies-${id}`}>
                {((showChildren) ? node.children : !node.children) && node.children.filter((childNode) => (childNode.author)).map(childNode => (
                    <TreeNode key={childNode.id} id={childNode.id} node={childNode} indent={indent + 1} parent={childNode.parent_id} parentName={node.author} postAuthor={postAuthor} />
                ))}</div>
        </div>
    );
}

// function CommentContainer({ id, node, indent, isRoot, parent, parentName, nodeRef, children, showChildren, setShowChildren }) {

// }

function CommentText({ children }) {
    return (
        <div className='content md:text-sm break-words overflow-auto w-full px-3 [&>p>a]:underline [&>p>a]:text-blue-900 [&>pre]:pre-wrap)'
        >{parse(children, {
            replace: domNode => {
                if (domNode.attribs) {
                    if (domNode.attribs.href) {
                        if (domNode.attribs.href.includes("item")) {
                            return <Link to={`https://lotusreader.netlify.app/item/${domNode.attribs.href.substring(37)}`} target="_blank">
                                {`${domNode.attribs.href}`}
                            </Link>
                        }
                        return <Link to={`${domNode.attribs.href}`} target="_blank">
                            {`${domNode.attribs.href}`}
                        </Link>
                    }
                }
            }
        })}
        </div>
    )
}

export default Comments