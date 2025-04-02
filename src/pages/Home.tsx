import React from "react";
import useReviews from "../hooks/useReviews";
import { Link } from "react-router";

const Home: React.FC = () => {
  const {
    reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useReviews();

  if (reviewsLoading) return <div>Loading reviews...</div>;
  if (reviewsError) return <div>Error: {reviewsError.message}</div>;

  return (
    <div>
      <h1>Reviews</h1>
      {reviews?.map((review) => (
        <div
          key={review.id}
          style={{
            marginBottom: "2rem",
            borderBottom: "1px solid #ddd",
            paddingBottom: "1rem",
          }}
        >
          <h2>
            <Link
              to={`/reviews/${review.id}`}
              style={{
                textDecoration: "none",
                color: "blue",
                cursor: "pointer",
              }}
            >
              {review.title}
            </Link>
          </h2>

          {/* Affichage du contenu avec séparation des paragraphes */}
          {review.content.split("\n\n").map((paragraph, index) => (
            <p key={index} style={{ marginBottom: "1rem" }}>
              {paragraph}
            </p>
          ))}

          {/* Vérifier si imageUrls existe avant d'afficher les images */}
          {review.image_urls && review.image_urls.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: "1rem",
              }}
            >
              {review.image_urls.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Review ${review.title} - ${index + 1}`}
                  style={{
                    width: "200px",
                    height: "auto",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
          )}

          <p style={{ marginBottom: "1rem" }}>
            <strong>Category:</strong> {review.category}
          </p>
          <p style={{ fontStyle: "italic", color: "gray" }}>
            Created on: {new Date(review.created_at).toLocaleDateString()}
          </p>

          {/* Section des commentaires */}
          {/* <CommentsSection reviewId={review.id} /> */}
        </div>
      ))}
    </div>
  );
};

// const CommentsSection = ({ reviewId }: { reviewId: string }) => {
//   const { comments, isLoading, error } = useComments(reviewId);

//   if (isLoading) return <p>Loading comments...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h3>Comments:</h3>
//       {comments?.length === 0 ? (
//         <p>No comments yet.</p>
//       ) : (
//         comments?.map((comment) => (
//           <div key={comment.id} style={{ marginBottom: "20px" }}>
//             <p>
//               <strong>User {comment.user_id}:</strong> {comment.content}
//             </p>
//             <p>
//               👍 {comment.total_likes} | 👎 {comment.total_dislikes}
//             </p>

//             {/* Afficher les replies */}
//             {comment.replies?.map((reply) => (
//               <div
//                 key={reply.id}
//                 style={{
//                   marginLeft: "20px",
//                   borderLeft: "2px solid gray",
//                   paddingLeft: "10px",
//                 }}
//               >
//                 <p>
//                   <strong>User {reply.user_id}:</strong> {reply.content}
//                 </p>
//                 <p>
//                   👍 {reply.total_likes} | 👎 {reply.total_dislikes}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ))
//       )}
//     </div>
// );
// };

export default Home;
