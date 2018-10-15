import React, { Component } from 'react';
import PropTypes from 'prop-types'

class RecentLinks extends Component {

    render() {

        return(
            <div>
                <h4>Recent Links: </h4>
                {this.props.links.map((link) => (
                    <p key={ link["fields"]["short_url"] }><a href={"/r/" + link["fields"]["short_url"] }>{ link["fields"]["short_url"] }</a> => <a href={ link["fields"]["long_url"] }>{ link["fields"]["long_url"] }</a></p>
                ))}



            </div>
        );
    }



}

RecentLinks.propTypes = {
    links: PropTypes.array.isRequired
};

export default RecentLinks