import Link from 'next/link';

import { categoryPathBySlug } from 'lib/categories';
import { authorPathBySlug } from 'lib/users';
import { formatDate } from 'lib/datetime';
import ClassName from 'models/classname';

import styles from './Metadata.module.scss';

const DEFAULT_METADATA_OPTIONS = {
  compactCategories: true,
};

const Metadata = ({ className, author, date, categories, options = DEFAULT_METADATA_OPTIONS }) => {
  const metadataClassName = new ClassName(styles.metadata);

  metadataClassName.addIf(className, className);

  const { compactCategories } = options;

  return (
    <ul className={metadataClassName.toString()}>
      {author && (
        <li className={styles.metadataAuthor}>
          <address>
            <img
              width={author.avatar.width}
              height={author.avatar.height}
              src={author.avatar.url}
              alt="Author Avatar"
            />
            By{' '}
            <Link href={authorPathBySlug(author.slug)}>
              <a rel="author">{author.name}</a>
            </Link>
          </address>
        </li>
      )}
      {date && (
        <li>
          <time pubdate="pubdate" dateTime={date}>
            {formatDate(date)}
          </time>
        </li>
      )}
      {Array.isArray(categories) && categories[0] && (
        <li className={styles.metadataCategories}>
          {compactCategories && (
            <p title={categories.map(({ name }) => name).join(', ')}>
              <Link href={categoryPathBySlug(categories[0].slug)}>
                <a>{categories[0].name}</a>
              </Link>
              {categories.length > 1 && ' and more'}
            </p>
          )}
          {!compactCategories && (
            <ul>
              {categories.map((category) => {
                return (
                  <li key={category.slug}>
                    <Link href={categoryPathBySlug(category.slug)}>
                      <a>{category.name}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      )}
    </ul>
  );
};

export default Metadata;
