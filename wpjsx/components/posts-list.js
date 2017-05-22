import { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

class PostsList extends Component {
    static defaultProps = {
        postsListData: {},
    };

    static propTypes = {
        postsListData: PropTypes.object,
    };

    render() {
        const { postsListData } = this.props;

        return (
            <div>
                {
                    map( postsListData.posts, post => (
                        <div key={ post.ID } className="site-post">
                            <p><strong>{ post.title }</strong></p>
                            <p>{ post.excerpt }</p>
                            <hr />
                        </div>
                    ) )
                }
            </div>
        );
    }
}

export default PostsList;
