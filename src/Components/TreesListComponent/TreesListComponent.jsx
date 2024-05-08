import TreeItem from "../TreeItem/TreeItem.jsx";
import styles from './TreesListComponent.module.scss';

const TreesListComponent = (props) => {
    const { trees } = props;

    return (
        <div className={styles.treesWrapper}>
            {trees.length > 0 && trees.map((tree) => (
                <TreeItem
                    key={tree.id}
                    tree={tree}
                />
            ))}
        </div>
    );
}

export default TreesListComponent;
