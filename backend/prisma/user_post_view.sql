CREATE VIEW sns.user_post AS
SELECT ROW_NUMBER() OVER (ORDER BY sns.post.id) AS id, sns.user.name, sns.user.portrait, sns.post.post, sns.post.updatedAt, sns.post.isLiked
FROM sns.post
LEFT OUTER JOIN sns.user ON sns.post.authorId = sns.user.id;


