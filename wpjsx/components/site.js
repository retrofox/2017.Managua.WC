import { Component } from 'react';
import PropTypes from 'prop-types';

class Site extends Component {
    static defaultProps = {
        blog: {},
    };

    static propTypes = {
        blog: PropTypes.object,
    };

    render() {
        const { blog } = this.props;

        return (
            <div>
                <br />
                <h1 style={ { color: "blue" } } >{ blog.name }</h1>

                <h2>
                    <a
                        href={ blog.URL }
                        title={ blog.name }
                    >
                        { blog.description }
                    </a>
                </h2>
            </div>
        );
    }
}

export default Site;
