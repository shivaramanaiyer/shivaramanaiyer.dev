import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';
import { graphql, Link } from 'gatsby';
import SEO from '../components/SEO';
import PostListing from '../components/PostListing';

class BlogPage extends Component {
  render() {
    const { edges } = this.props.data.allMarkdownRemark;
    return (
      <Layout>
        <div className='container'>
          <Helmet title={`Blog - ${config.siteTitle}`} />
          <SEO />
          <h1 className='page-title'>Blog</h1>
          {edges.length ? (
            <div>
              <PostListing postEdges={edges} />
              <small style={{display:'block', textAlign:'center'}}>
                Find archived posts <Link to='/archives'>here</Link>
              </small>
            </div>
          ) : (
            <blockquote>
              <p>
                If any articles that you are looking for aren't present here, they probably are{' '}
                <Link to='/archives'>archived</Link>
              </p>
            </blockquote>
          )}
        </div>
      </Layout>
    );
  }
}

export default BlogPage;

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { fields: frontmatter___created, order: DESC }
      filter: { frontmatter: { layout: { eq: "post" }, archived: { ne: true } } }
    ) {
      edges {
        node {
          fields {
            slug
            created
          }
          excerpt
          frontmatter {
            created
            category
            title
            tags
            thumbnail {
              publicURL
            }
            category
          }
          parent {
            ... on File {
              relativePath
            }
          }
        }
      }
    }
  }
`;
