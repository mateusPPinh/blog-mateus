import React from 'react';
import 'minireset.css';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

export default () => (
  <Layout>
    <p>
      Página inicial
    </p>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`