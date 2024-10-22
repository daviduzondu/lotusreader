
import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { BsReplyFill } from "react-icons/bs";
import { HiUser } from "react-icons/hi"
import {AiOutlinePlus} from 'react-icons/ai'
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
                (rootNode.author) && <TreeNode key={rootNode.id} id={rootNode.id} node={rootNode} indent={0} isRoot={true} parentId={null} parentName={null} postAuthor={postAuthor} />
            ))}
        </div>
    );
}

function TreeNode({ id, node, indent, isRoot, parentId, parentName, postAuthor }) {
    const commentRef = useRef();
    const [showChildren, setShowChildren] = useState(true);
    const [parentEl, enableAnimations] = useAutoAnimate();
    const [hiddenRepliesCount, sethiddenRepliesCount] = useState();
    const [hovering, setHovering] = useState(false);  // New hover state
    

    function showHideChildren(replies_id) {
        let replies = document.querySelector(`.replies-${replies_id}`);
        if (replies.classList.contains("hidden")) {
            replies.classList.remove("hidden");
            document.querySelector(`.comment-${replies_id}`).classList.remove("bg-blue-200")
            sethiddenRepliesCount();
        } else if (replies.childElementCount > 0) {
            document.querySelector(`.comment-${replies_id}`).classList.add("bg-blue-200")
            replies.classList.add("hidden");
            sethiddenRepliesCount(replies.childElementCount);
        }
    }

    // Set hovering state on mouse events
    const handleMouseOver = () => {
        setHovering(true);
    };

    const handleMouseOut = () => {
        setHovering(false);
    };

    return (
        <div
            className={(!isRoot) ? `comment-container comment-${id} inner-comment-shadow ml-3 border border-b-0 border-r-0 border-black hover:cursor-default`
                : `comment-container root-shadow comment-${id} border border-black mt-3 hover:cursor-default rounded-md`}
                id={`comment-${id}`}
            data-parent-id={`parent-${id}`}
            // ref={commentRef}
        >
            {(node.author && node.text) && (
                <div className='content'     
                ref={commentRef}  
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}>
                    <div className='headers text-blue-900 md:text-xs text-sm font-bold w-full px-3 flex items-center my-3'>
                        <div className='flex flex-1 items-center'>
                            {(node.author === postAuthor) ? <><HiUser className='mr-1' /> {node.author}</> : node.author}
                            {(parentName) && <>
                                <BsReplyFill className='mx-1' />
                                <a className='hover:cursor-pointer hover:underline' href={`#comment-${parentId}`}>
                                    {(parentName === postAuthor) ? <><HiUser className='mr-1 inline' /> {parentName}</> : parentName}
                                </a>
                            </>}
                            <RxDotFilled className='mx-1' />
                            <span>{moment(node.created_at).fromNow()}</span>
                        </div>
                        <div className='flex relative -mt-6 -mr-1 scale-90'>
                            {/* Show buttons based on hovering state */}
                                <div className={`absolute right-0 md:text-sm text-gray-700 ${hovering ? "opacity-100" :"opacity-0"}`} onClick={() => showHideChildren(id)} >
                                    {(hiddenRepliesCount) ? (
                                        <div className='flex font-normal hover:cursor-pointer items-center border border-gray-800 py-1 px-2 rounded-full'>
                                            <FiMaximize2 className='text-xl scale-75 mr-1' />
                                            {hiddenRepliesCount}
                                        </div>
                                    ) : (
                                        ((document.querySelector(`.replies-${id}`)) && document.querySelector(`.replies-${id}`).childElementCount > 0) && (
                                            <div className='flex font-normal hover:cursor-pointer items-center border border-gray-800 py-1 px-2 rounded-full'>
                                                <FiMinimize2 className='text-xl scale-75' />
                                            </div>
                                        )
                                    )}
                                </div>
                        </div>
                    </div>
                    <CommentText>{node.text}</CommentText>
                </div>
            )}
            <div className={`replies-${id}`}>
                {((showChildren) ? node.children : !node.children) && node.children.filter((childNode) => (childNode.author)).map(childNode => (
                    <TreeNode key={childNode.id} id={childNode.id} node={childNode} indent={indent + 1} parentId={childNode.parent_id} parentName={node.author} postAuthor={postAuthor} />
                ))}
            </div>
        </div>
    );
}

function CommentText({ children }) {
    return (
        <div className='content md:text-sm text-sm break-words overflow-auto w-full px-3 pb-3 [&>p>a]:underline [&>p>a]:text-blue-900 [&>pre]:pre-wrap)'
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