create table listings (
  id bigint generated always as identity primary key,
  title text not null,
  price int,
  description text,
  category text,
  created_at timestamp default now()
);

create table listing_images (
  id bigint generated always as identity primary key,
  listing_id bigint references listings(id) on delete cascade,
  url text not null,
  created_at timestamp default now()
);

alter table listing_images
add constraint listing_images_unique_per_product
unique (listing_id, url);