import gql from "graphql-tag";

export const MOVIE_FRAGMENT = gql`
  fragment movie on Movie {
    # Bak buna bu __typename'e gerek var mı? Veya ne sıklıkla nerelerde kullanmak lazım?
    # Sanırım gerek yok çünkü zaten fragment tanımlarken "on Movie" deniyor.
    id
    title
    year
    imageUrl
    viewerHasLiked
    __deleted @client
  }
`;
