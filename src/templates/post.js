import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import moment from "moment";
import Layout from "../layout";
import Disqus from "../components/Disqus";
import PostTags from "../components/PostTags";
import SocialLinks from "../components/SocialLinks";
import SiblingLinks from "../components/SiblingLinks";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";
import blankWhite from "../../content/images/thumbnail/blank.png";

export default class PostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const { slug } = pageContext;
    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;
    let thumbnail;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }

    if (post.thumbnail) {
      thumbnail = post.thumbnail.publicURL;
    }

    return (
      <Layout>
        <div className="container">
          <Helmet>
            <title>{`${post.title} | ${config.siteTitle}`}</title>
          </Helmet>
          <SEO postPath={slug} postNode={postNode} postSEO />
          <article className="post-content">
            <div className="post-head">
              <div className="post-thumbnail">
                <img
                  src={post.thumbnail ? post.thumbnail.publicURL : blankWhite}
                  alt={post.title}
                />
              </div>

              <div className="post-meta">
                <h1 className="post-title">{post.title}</h1>
                <div className="post-date">
                  Written on:{" "}
                  {moment(post.created, config.dateFromFormat).format(
                    config.dateFormat
                  )}{" "}
                  {post.edited &&
                    `| Edited on: ` +
                      moment(post.edited, config.dateFromFormat).format(
                        config.dateFormat
                      )}
                </div>
                <PostTags tags={post.tags} />
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            <div className="post-footer">
              <SocialLinks postPath={slug} postNode={postNode} />
              {console.log(post)}
              <SiblingLinks config={pageContext} isArchived={post.archived} />
            </div>
            <Disqus postNode={postNode} />
          </article>
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        created
        edited
        categories
        tags
        archived
        thumbnail {
          publicURL
        }
      }
      fields {
        slug
        created
      }
    }
  }
`;
