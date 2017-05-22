/**
 * External dependencies
 */
import { Component, Children, cloneElement } from 'react';
import request from 'superagent';

// WP COM REST
const hostname = "https://public-api.wordpress.com";
const apiVersion = "v1.1";

class Provider extends Component {
    state = {
        blog: {},
        postsList: {},
    };

    componentDidMount() {
        this.requestSite();
        this.requestPostsList();
    }

    componentWillReceiveProps( nextProps, nextState ) {
        if ( this.props.blogId !== nextProps.blogId ) {
            this.requestSite( nextProps.blogId );
            this.requestPostsList( nextProps.blogId  );
            return true;
        }

        return false;
    }

    requestSite( blogId = this.props.blogId ) {
        const siteEndpoint = `${ hostname }/rest/${ apiVersion }/sites/${ blogId }`;

        request
            .get( siteEndpoint )
            .set( 'Accept', 'json/application' )
            .then( ( { body, ok } ) => {
                if ( ! ok ) {
                    return console.error( 'ERROR !!!' );
                }

                this.setState( { blog: body } );
            } )
            .catch( error => console.error( error ) );
    }

    requestPostsList( blogId = this.props.blogId ) {
        const siteEndpoint = `${ hostname }/rest/${ apiVersion }/sites/${ blogId }/posts`;

        request
            .get( siteEndpoint )
            .query( {
                number: 10
            } )
            .set( 'Accept', 'json/application' )
            .then( ( { body, ok } ) => {
                if ( ! ok ) {
                    return console.error( 'ERROR !!!' );
                }

                this.setState( { postsList: body } );
            } )
            .catch( error => console.error( error ) );
    }

    render() {
        const populatedChildren = Children.map( this.props.children,
            ( child ) => cloneElement( child, {
                blog: this.state.blog,
                postsListData: this.state.postsList,
            } )
        );

        return(
            <div>
                { populatedChildren }
            </div>
        );
    }
}

export default Provider;
