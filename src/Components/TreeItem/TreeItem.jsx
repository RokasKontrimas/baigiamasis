import styles from './TreeItem.module.scss'
import {Link} from "react-router-dom";
import axios from "../../axios.jsx";
import {useEffect, useState} from "react";

const TreeItem = (props) => {
    const {id, name, imageUrl, treeCategory} = props.tree;
    const [relatedTree, setRelatedTree] = useState('')
    useEffect(() => {
        const getTree = async () => {
            try {
                await axios.get(`/relatedTrees?treeId=${id}`)
                    .then((res) => {
                        setRelatedTree(res.data[0])
                    })
            } catch (e) {
                console.log(e)
            }
        }
        getTree()
    }, []);

    const handleLinkClick = async () => {
        try {
            await axios.patch(`/relatedTrees/${relatedTree.id}`, {
                counter: Number(relatedTree.counter) + 1
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={styles.treeItem}>
            <img src={imageUrl} loading="lazy"/>
            <Link className={styles.linkCategory} to={`/trees/category/${treeCategory.id}`}>{treeCategory.name}</Link>
            <Link onClick={() => {
                handleLinkClick()
            }}
                  className={styles.linkTree} to={`/tree/${id}`}>
                <h3 className={styles.treeName}>{name}</h3>
            </Link>
        </div>
    )
}
export default TreeItem
