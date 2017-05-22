/**
 * External dependencies
 */
import { Component, Children, cloneElement } from 'react';
import request from 'superagent';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
/**
 * Internal dependencies
 */
import Provider from '../components/provider';
import Site from '../components/site';
import PostsList from '../components/posts-list';

const blogId = 'es.blog.wordpress.com';
const blogId_2 = 'en.blog.wordpress.com';
const blogId_3 = 'techcrunch.com';

class SiteSelector extends Component {
    static defaultProps = {
        onSiteSelected: noop,
    }

    static defaultProps = {
        onSiteSelected: PropTypes.func,
    }

    state = {
        value: ''
    }

    componentWillMount() {
        if ( this.props.blogId ) {
            this.setState( { value: this.props.blogId } );
        }
    }

    handleKeyPressEvent = event => {
        this.setState( { value: event.target.value } );
    }

    handleOnSearch = event => {
        if ( event.keyCode === 13 ) {
            this.props.onSiteSelected( this.state.value );
        }
    }

    render() {
        return(
            <input
                type="text"
                style={ {
                    width: 300,
                    height: 40,
                    lineHeight: 40,
                    padding: '2px 10px'
                } }
                value={ this.state.value }
                onChange={ this.handleKeyPressEvent }
                onKeyDown={ this.handleOnSearch }
            />
        )
    }
}

class Homepage extends Component {
    state = {
        blogId: blogId,
    }

    setBlog = selectedBlog => {
        this.setState( { blogId: selectedBlog } );
    }

    render() {
        return(
            <div style={ {
                padding: 0,
                margin: "20px",
            } }>
                <h1>WPJSX</h1>
                <h3>WordCamp Managua 2017</h3>

                <SiteSelector
                    onSiteSelected={ this.setBlog }
                    blogId={ blogId }
                />

                <Provider blogId={ this.state.blogId }>
                    <Site />
                    <PostsList />
                </Provider>
            </div>
        );
    }
}

export default Homepage;
