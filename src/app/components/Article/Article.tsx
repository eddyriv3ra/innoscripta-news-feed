import Image from 'next/image'
import styles from "./styles.module.scss"
import { IArticle } from '@/app/interfaces'


const Article = ({ item }: { item : IArticle}) => {
  return (
    <div key={item.publishedAt} className={styles.newsContainer}>
        <div className={styles.imgContainer}>
          {item.urlToImage ? (
            <Image
              src={item.urlToImage}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
              alt={item.title}
            />
          ) : (
            <Image
              src={"/images/No-Image-Placeholder.svg"}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%" }}
              alt={item.title}
            />
          )}
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.titleContainer}>
            <p className={styles.title}>{item.title}</p>
          </div>
          <div>
            <p>{item.description}</p>
          </div>
          <a
            className={styles.link}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
  )
}

export default Article