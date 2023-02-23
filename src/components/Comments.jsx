
import React from 'react'
import { useState, useEffect } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { BsReplyFill } from "react-icons/bs";
import { FiMinimize2, FiMaximize2, FiEye } from 'react-icons/fi'
import parse from 'html-react-parser';
import Tippy from '@tippyjs/react';

function Comments({ comments }) {
    return (<Tree data={comments} />)
}
function Tree({ data }) {
    return (
        <div className='md:mb-3 mx-3'>
            {data.map(rootNode => (
                // console.log(rootNode)
                (rootNode.author) && <TreeNode key={rootNode.id} id={rootNode.id} node={rootNode} indent={0} isRoot={true} parent={null} parentName={null} />
            ))}
        </div>
    );
}

function TreeNode({ id, node, indent, isRoot, parent, parentName }) {
    const [showChildren, setShowChildren] = useState(true);
    const [parentEl, enableAnimations] = useAutoAnimate();
    const [hiddenRepliesCount, sethiddenRepliesCount] = useState();

    function showHideChildren(replies_id) {
        let replies = document.querySelector(`.replies-${replies_id}`);
        if (replies.classList.contains("hidden")) {
            // Remove the hidden class
            replies.classList.remove("hidden");
            // Set the hidden replies to null
            sethiddenRepliesCount();
        }
        else if (replies.childElementCount > 0) {
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
            (!isRoot) ? `comment-container inner-comment-shadow  ml-3 border border-b-0 border-r-0 border-black hover:cursor-default`
                : `comment-container root-shadow
            border border-black mt-3  hover:cursor-default`} data-parent-id={`parent-${id}`} ref={parentEl}>

            {/* Render the comment's headers and text */}
            {(node.author && node.text) &&
                <div className='content py-3 ' onClick={() => showHideChildren(id)}>
                    <div className='headers text-blue-900 font-bold w-full px-3 py-1 flex items-center '>
                        <div className='flex flex-1 items-center'>
                            {node.author}{(parentName) && <> <BsReplyFill className='mx-1' /> <span className="hover:cursor-pointer hover:underline"
                                onClick={() => getParent(parent, parentName)}>{parentName}</span></>}</div>
                        {
                            //Checks to see if hiddenRepliesCount(int) is truthy
                            (hiddenRepliesCount) ?
                                //Show the "Show [hiddenRepliesCount]" button
                                (<div className='flex font-normal hover:cursor-pointer hover:underline' >
                                    <FiMaximize2 className='text-xl mr-2 ' />
                                    expand thread</div>
                                )
                                :
                                // Else: Checks to see if the element we clicked on has any replies and if it does, show the 'hide replies button'
                                ((document.querySelector(`.replies-${id}`)) && document.querySelector(`.replies-${id}`).childElementCount > 0) && <div className='flex font-normal hover:cursor-pointer hover:underline'>
                                    <FiMinimize2 className='text-xl mr-2' />
                                    collapse thread</div>
                        }
                    </div>
                    <CommentText>{node.text}</CommentText>
                </div>
            }
            {/* Recursively show the comments in a tree format. */}
            <div className={`replies-${id}`}>
                {((showChildren) ? node.children : !node.children) && node.children.filter((childNode) => (childNode.author)).map(childNode => (
                    <TreeNode key={childNode.id} id={childNode.id} node={childNode} indent={indent + 1} parent={childNode.parent_id} parentName={node.author} />
                ))}</div>
        </div>
    );
}

// function CommentContainer({ id, node, indent, isRoot, parent, parentName, nodeRef, children, showChildren, setShowChildren }) {

// }

function CommentText({ children }) {

    return (
        <div className='content cursor-pointer break-words overflow-auto w-full px-3 [&>p>a]:underline [&>p>a]:text-blue-900 [&>pre]:pre-wrap)'
        >{parse(children)}
        </div>
    )
}

export default Comments