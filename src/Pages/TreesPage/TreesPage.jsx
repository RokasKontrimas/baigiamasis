import {useEffect, useState} from 'react';
import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import axios from "../../axios.jsx";
import TreesListComponent from "../../Components/TreesListComponent/TreesListComponent.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from './TreesPage.module.scss'
import {useLocation} from "react-router-dom";
import ToastMessage from "../../Components/ToastMessage/ToastMessage.jsx";


const TreesPage = () => {
    const PER_PAGE_NUMBER = 9;
    const [trees, setTrees] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadedTreeIds, setLoadedTreeIds] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const getTrees = async () => {
            try {
                const res = await axios.get(`/trees?_page=${page}&_per_page=${PER_PAGE_NUMBER}&_embed=treeCategory`);
                const newTrees = res.data.data.filter(tree => !loadedTreeIds.includes(tree.id));

                // If it's the first page, directly set the trees
                if (page === 1) {
                    setTrees(newTrees);
                } else {
                    setTrees(prevTrees => [...prevTrees, ...newTrees]);
                }

                setLoadedTreeIds(prevIds => [...prevIds, ...newTrees.map(tree => tree.id)]);

                // Update hasMore based on whether newTrees is empty or not
                setHasMore(newTrees.length > 0);

            } catch (e) {
                console.log(e);
            }
        };

        getTrees();
    }, [page]);
    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    }

    return (
        <ContainerComponent>
            <h1 className={styles.pageTitle}>Trees List</h1>
            {trees.length > 0 ? (
                <InfiniteScroll
                    dataLength={trees.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    scrollThreshold={0.9}
                >
                    <TreesListComponent trees={trees}/>
                </InfiniteScroll>
            ) : (
                <h2>Sorry, nothing to show... :(</h2>
            )}
            {location.state && (
                <ToastMessage
                    state={location.state.message}
                />
            )}

        </ContainerComponent>
    )
}
export default TreesPage;
