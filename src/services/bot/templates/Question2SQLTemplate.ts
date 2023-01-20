// # MySQL tables, for hackernews, with their properties:
// #
// # items:
// # - id(bigint) primary key
// # - title(varchar)
// # - `by`(varchar), foreign key, references users(id)
// # - url, nullable
// # - parent(bigint), foreign key, references items(id)
// # - descendants(integer) alias comments_count
// # - text(text)
// # - deleted(boolean)
// # - dead(boolean)
// # - type(varchar), include: story, comment, poll, job
// # - time(integer)
// # - score(integer)
// # users:
// # - id(varchar) primary key
// # - karma(integer)
// # - about(text)
// # - created(integer)
// # what is datetime item created: select FROM_UNIXTIME(time) as created_at from items;
// # what is datetime user created: select FROM_UNIXTIME(created) as created_at from users;
// # what is month item created: select DATE_FORMAT(FROM_UNIXTIME(time), '%Y-%m-01') AS month from items;
// # what is domain for item url: select SUBSTRING_INDEX(url, '/', 3) as domain from items;
// # what is TLD for item:
// # SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(url, '/', 3), '://', -1), '/', 1), '?', 1), '.', -1)#{' '}
// # AS tld FROM items where url is not null;
// # what is the default limit for all queries: 100
// # what is the default limit for agg queries: 20
// # what is the default filter for items: deleted = 0 and dead = 0
// # what is the default sort order for all queries: if contain day,month,year -> asc
// # what is score of item: the num of item voted by other users
// # what is SQL mention? select count(*) from items where lower(concat_ws(' ', title, text)) regexp '\\\\bsql\\\\b' from items;
// # Notice: don't use reserved word as alias name or column name in sql
// # Notice: don't output superfluous and leading double quote in sql

// Let's think step by step, use best practice of writing SQL, use common table expression if and only if necessary, generate only one SQLto answer this question: "how many stories created yesterday"

import { Template } from 'src/services/bot/types';

class Question2SQLTemplate implements Template {
  getTemplate(question: string) {
    return `
# MySQL tables, for hackernews, with their properties:
#
# items:
# - id(bigint) primary key
# - title(varchar)
# - \`by\`(varchar), foreign key, references users(id)
# - url, nullable
# - parent(bigint), foreign key, references items(id)
# - descendants(integer) alias comments_count
# - text(text)
# - deleted(boolean)
# - dead(boolean)
# - type(varchar), include: story, comment, poll, job
# - time(integer)
# - score(integer)
# users:
# - id(varchar) primary key
# - karma(integer)
# - about(text)
# - created(integer)
# what is datetime item created: select FROM_UNIXTIME(time) as created_at from items;
# what is datetime user created: select FROM_UNIXTIME(created) as created_at from users;
# what is month item created: select DATE_FORMAT(FROM_UNIXTIME(time), '%Y-%m-01') AS month from items;
# what is domain for item url: select SUBSTRING_INDEX(url, '/', 3) as domain from items;
# what is TLD for item:
# SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(url, '/', 3), '://', -1), '/', 1), '?', 1), '.', -1)#{' '}
# AS tld FROM items where url is not null;
# what is the default limit for all queries: 100
# what is the default limit for agg queries: 20
# what is the default filter for items: deleted = 0 and dead = 0
# what is the default sort order for all queries: if contain day,month,year -> asc
# what is score of item: the num of item voted by other users
# what is SQL mention? select count(*) from items where lower(concat_ws(' ', title, text)) regexp '\\\\bsql\\\\b' from items;
# Notice: don't use reserved word as alias name or column name in sql
# Notice: don't output superfluous and leading double quote in sql

Must append the limit to SQL!!!
Let's think step by step, use best practice of writing SQL, use common table expression if and only if necessary, generate only one SQL to answer this question: "${question}"`;
  }
}

export default Question2SQLTemplate;
