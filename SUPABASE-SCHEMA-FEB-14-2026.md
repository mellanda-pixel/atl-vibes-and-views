# Supabase Public Schema — February 14, 2026
## Source of Truth — 76 tables, 889 columns

**Queried directly from Supabase SQL Editor.**
**This file supersedes all previous schema dumps.**

---

### `ad_campaigns` (10 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| sponsor_id | uuid | NO |
| name | text | NO |
| start_date | date | NO |
| end_date | date | NO |
| budget | numeric | YES |
| status | text | NO |
| notes | text | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `ad_creatives` (16 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| campaign_id | uuid | NO |
| creative_type | text | NO |
| headline | character varying | YES |
| body | character varying | YES |
| cta_text | character varying | YES |
| target_url | text | NO |
| image_url | text | YES |
| media_asset_id | uuid | YES |
| alt_text | text | YES |
| utm_campaign | text | YES |
| utm_source | text | YES |
| utm_medium | text | YES |
| is_active | boolean | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `ad_flights` (13 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| placement_id | uuid | NO |
| campaign_id | uuid | NO |
| creative_id | uuid | NO |
| start_date | date | NO |
| end_date | date | NO |
| status | text | NO |
| priority | integer | YES |
| share_of_voice | integer | YES |
| cap_impressions | integer | YES |
| cap_clicks | integer | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `ad_placements` (9 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| name | text | NO |
| channel | text | NO |
| placement_key | text | NO |
| page_type | text | YES |
| dimensions | text | YES |
| description | text | YES |
| is_active | boolean | NO |
| created_at | timestamp with time zone | NO |

### `amenities` (6 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| name | text | NO |
| slug | text | NO |
| amenity_group | text | YES |
| sort_order | integer | NO |
| created_at | timestamp with time zone | NO |

### `areas` (13 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| name | text | NO |
| slug | text | NO |
| city_id | uuid | NO |
| description | text | YES |
| tagline | text | YES |
| hero_image_url | text | YES |
| map_center_lat | numeric | YES |
| map_center_lng | numeric | YES |
| is_active | boolean | NO |
| sort_order | integer | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `authors` (13 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| name | text | NO |
| slug | text | NO |
| bio | text | YES |
| avatar_url | text | YES |
| email | text | YES |
| website | text | YES |
| instagram | text | YES |
| twitter | text | YES |
| role | text | YES |
| is_active | boolean | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `blog_posts` (37 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| title | text | NO |
| slug | text | NO |
| token_name | text | YES |
| content_html | text | YES |
| content_md | text | YES |
| excerpt | text | YES |
| type | text | YES |
| pillar_id | uuid | YES |
| category_id | uuid | YES |
| neighborhood_id | uuid | YES |
| author_id | uuid | YES |
| is_sponsored | boolean | NO |
| sponsor_business_id | uuid | YES |
| featured_image_url | text | YES |
| featured_image_source | text | YES |
| featured_image_credit | text | YES |
| featured_image_notes | text | YES |
| meta_title | text | YES |
| meta_description | text | YES |
| seo_keywords | text | YES |
| canonical_url | text | YES |
| word_count | integer | YES |
| status | text | NO |
| scheduled_publish_date | timestamp with time zone | YES |
| published_at | timestamp with time zone | YES |
| content_source | text | YES |
| source_url | text | YES |
| google_doc_url | text | YES |
| tokens_used | integer | YES |
| content_index_record_id | uuid | YES |
| is_featured | boolean | NO |
| byline_override | text | YES |
| notes | text | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |
| content_type | text | YES |

### `brands` (6 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| brand_name | text | NO |
| brand_logo | text | YES |
| brand_website | text | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `business_amenities` (4 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| business_id | uuid | NO |
| amenity_id | uuid | NO |
| created_at | timestamp with time zone | NO |

### `business_contacts` (10 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| business_id | uuid | NO |
| contact_name | text | NO |
| contact_title | text | YES |
| contact_email | text | YES |
| contact_phone | text | YES |
| is_primary | boolean | NO |
| is_public | boolean | NO |
| notes | text | YES |
| created_at | timestamp with time zone | NO |

### `business_hours` (8 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| business_id | uuid | NO |
| day_of_week | text | NO |
| open_time | time without time zone | YES |
| close_time | time without time zone | YES |
| is_closed | boolean | NO |
| notes | text | YES |
| created_at | timestamp with time zone | NO |

### `business_identities` (4 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| business_id | uuid | NO |
| identity_option_id | uuid | NO |
| created_at | timestamp with time zone | NO |

### `business_identity_options` (5 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| name | text | NO |
| slug | text | NO |
| sort_order | integer | NO |
| created_at | timestamp with time zone | NO |

### `business_images` (9 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| business_id | uuid | NO |
| image_url | text | NO |
| media_asset_id | uuid | YES |
| caption | text | YES |
| alt_text | text | YES |
| sort_order | integer | NO |
| is_primary | boolean | NO |
| created_at | timestamp with time zone | NO |

### `business_listings` (48 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| business_name | text | NO |
| tagline | character varying | YES |
| description | character varying | YES |
| slug | text | NO |
| street_address | text | NO |
| street_address_2 | text | YES |
| state | text | NO |
| zip_code | text | NO |
| neighborhood_id | uuid | NO |
| latitude | numeric | YES |
| longitude | numeric | YES |
| phone | text | YES |
| email | text | YES |
| website | text | YES |
| primary_link | text | YES |
| primary_link_label | text | YES |
| instagram | text | YES |
| facebook | text | YES |
| tiktok | text | YES |
| x_twitter | text | YES |
| logo | text | YES |
| video_url | text | YES |
| category_id | uuid | YES |
| price_range | text | YES |
| display_identity_publicly | boolean | NO |
| certified_diversity_program | boolean | NO |
| special_offers | text | YES |
| is_featured | boolean | NO |
| featured_on_map | boolean | NO |
| tier | text | NO |
| previous_tier | text | YES |
| tier_start_date | date | YES |
| tier_expires_at | date | YES |
| grace_period_end | date | YES |
| tier_auto_downgraded | boolean | NO |
| map_pin_style | text | NO |
| parent_brand_id | uuid | YES |
| claimed | boolean | NO |
| claimed_by | uuid | YES |
| claimed_at | timestamp with time zone | YES |
| claim_status | text | NO |
| claim_verification_method | text | YES |
| status | text | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |
| city_id | uuid | NO |
| order_online_url | text | YES |

### `business_organizations` (5 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| business_id | uuid | NO |
| organization_id | uuid | NO |
| membership_status | text | YES |
| created_at | timestamp with time zone | NO |

### `business_tags` (4 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| business_id | uuid | NO |
| tag_id | uuid | NO |
| created_at | timestamp with time zone | NO |

### `categories` (9 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| name | text | NO |
| slug | text | NO |
| description | text | YES |
| applies_to | ARRAY | NO |
| sort_order | integer | NO |
| is_active | boolean | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `cities` (17 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| name | text | NO |
| slug | text | NO |
| state | text | NO |
| description | text | YES |
| tagline | text | YES |
| hero_image_url | text | YES |
| logo_url | text | YES |
| latitude | numeric | YES |
| longitude | numeric | YES |
| population | integer | YES |
| metro_area | text | YES |
| is_primary | boolean | NO |
| is_active | boolean | NO |
| sort_order | integer | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `claims` (11 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| business_id | uuid | NO |
| user_id | uuid | NO |
| claim_status | text | NO |
| verification_method | text | YES |
| submitted_proof | text | YES |
| reviewer_notes | text | YES |
| reviewed_by | uuid | YES |
| reviewed_at | timestamp with time zone | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `content_calendar` (7 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| story_id | uuid | YES |
| post_id | uuid | YES |
| tier | text | YES |
| scheduled_date | date | NO |
| status | text | YES |
| created_at | timestamp with time zone | YES |

### `content_history` (9 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| story_id | uuid | NO |
| post_id | uuid | YES |
| tier | text | YES |
| angle_summary | text | YES |
| category_id | uuid | YES |
| neighborhood_id | uuid | YES |
| published_at | timestamp with time zone | YES |
| created_at | timestamp with time zone | YES |

### `content_index` (16 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| token_name | text | NO |
| target_type | text | NO |
| target_id | uuid | YES |
| active_url | text | YES |
| anchor_suggestions | jsonb | YES |
| is_active | boolean | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |
| page_title | text | YES |
| page_intro | text | YES |
| page_body | text | YES |
| hero_image_url | text | YES |
| hero_video_url | text | YES |
| seo_title | text | YES |
| meta_description | text | YES |

### `content_performance` (30 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| published_content_id | uuid | NO |
| impressions | integer | YES |
| reach | integer | YES |
| interactions | integer | YES |
| clicks | integer | YES |
| likes | integer | YES |
| comments | integer | YES |
| shares | integer | YES |
| saves | integer | YES |
| video_views | integer | YES |
| avg_watch_time_seconds | integer | YES |
| watch_time_total_seconds | integer | YES |
| audience_retention_pct | numeric | YES |
| watched_full_pct | numeric | YES |
| page_views | integer | YES |
| unique_visitors | integer | YES |
| avg_time_on_page_seconds | integer | YES |
| bounce_rate | numeric | YES |
| newsletter_opens | integer | YES |
| newsletter_clicks | integer | YES |
| newsletter_open_rate | numeric | YES |
| newsletter_click_rate | numeric | YES |
| follower_delta | integer | YES |
| profile_visits | integer | YES |
| analytics_source | text | NO |
| measured_at | timestamp with time zone | NO |
| period_start | timestamp with time zone | YES |
| period_end | timestamp with time zone | YES |
| created_at | timestamp with time zone | YES |

### `event_images` (9 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| event_id | uuid | NO |
| image_url | text | NO |
| media_asset_id | uuid | YES |
| caption | text | YES |
| alt_text | text | YES |
| sort_order | integer | NO |
| is_primary | boolean | NO |
| created_at | timestamp with time zone | NO |

### `event_map_pin_rules` (9 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| tier | text | NO |
| pin_style | text | NO |
| pin_color | text | YES |
| clickable | boolean | NO |
| shows_preview | boolean | NO |
| shows_photo | boolean | NO |
| notes | text | YES |
| created_at | timestamp with time zone | NO |

### `event_tags` (4 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| event_id | uuid | NO |
| tag_id | uuid | NO |
| created_at | timestamp with time zone | NO |

### `event_tier_pricing` (7 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| tier | text | NO |
| default_price_cents | integer | NO |
| currency | text | NO |
| is_active | boolean | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `event_tier_visibility_rules` (7 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| tier | text | NO |
| field_name | text | NO |
| visible | boolean | NO |
| notes | text | YES |
| created_at | timestamp with time zone | NO |
| max_items | integer | YES |

### `events` (47 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| title | text | NO |
| slug | text | NO |
| tagline | character varying | YES |
| description | character varying | YES |
| event_type | text | YES |
| start_date | date | NO |
| start_time | time without time zone | YES |
| end_date | date | YES |
| end_time | time without time zone | YES |
| is_recurring | boolean | NO |
| recurrence_rule | text | YES |
| venue_name | text | YES |
| street_address | text | YES |
| street_address_2 | text | YES |
| state | text | YES |
| zip_code | text | YES |
| neighborhood_id | uuid | YES |
| latitude | numeric | YES |
| longitude | numeric | YES |
| organizer_name | text | YES |
| organizer_url | text | YES |
| ticket_url | text | YES |
| ticket_price_min | numeric | YES |
| ticket_price_max | numeric | YES |
| is_free | boolean | NO |
| category_id | uuid | YES |
| pillar_id | uuid | YES |
| featured_image_url | text | YES |
| website | text | YES |
| is_featured | boolean | NO |
| featured_on_map | boolean | NO |
| tier | text | NO |
| submitted_by | uuid | YES |
| status | text | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |
| venue_business_id | uuid | YES |
| organizer_business_id | uuid | YES |
| listing_price_cents | integer | YES |
| price_override_cents | integer | YES |
| pricing_source | text | YES |
| is_comped | boolean | NO |
| payment_status | text | NO |
| stripe_payment_intent_id | text | YES |
| featured_until | timestamp with time zone | YES |
| city_id | uuid | NO |

### `featured_slots` (12 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| placement_key | text | NO |
| entity_type | text | NO |
| entity_id | uuid | NO |
| label | text | YES |
| start_date | date | YES |
| end_date | date | YES |
| sort_order | integer | NO |
| is_active | boolean | NO |
| created_by | uuid | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `headline_variants` (7 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| post_id | uuid | NO |
| variant_number | integer | YES |
| headline_text | text | NO |
| is_selected | boolean | YES |
| performance_score | integer | YES |
| created_at | timestamp with time zone | YES |

### `map_pin_rules` (9 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| tier | text | NO |
| pin_style | text | NO |
| pin_color | text | YES |
| clickable | boolean | NO |
| shows_preview | boolean | NO |
| shows_photo | boolean | NO |
| notes | text | YES |
| created_at | timestamp with time zone | NO |

### `media_assets` (19 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| file_url | text | NO |
| file_name | text | NO |
| file_type | text | NO |
| mime_type | text | YES |
| file_size | integer | YES |
| width | integer | YES |
| height | integer | YES |
| duration_seconds | integer | YES |
| alt_text | text | YES |
| caption | text | YES |
| source | text | YES |
| credit | text | YES |
| tags | jsonb | YES |
| uploaded_by | uuid | YES |
| folder | text | YES |
| is_active | boolean | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `media_item_assets` (8 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| media_item_id | uuid | NO |
| asset_id | uuid | NO |
| role | text | NO |
| is_primary | boolean | NO |
| sort_order | integer | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `media_item_links` (8 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| media_item_id | uuid | NO |
| target_type | text | NO |
| target_id | uuid | NO |
| is_primary_for_target | boolean | NO |
| sort_order | integer | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `media_items` (18 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| title | text | NO |
| slug | text | NO |
| excerpt | text | YES |
| description | text | YES |
| media_type | text | NO |
| source_type | text | NO |
| embed_url | text | YES |
| status | text | NO |
| published_at | timestamp with time zone | YES |
| is_featured | boolean | NO |
| sort_order | integer | NO |
| is_active | boolean | NO |
| seo_title | text | YES |
| meta_description | text | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |
| thumbnail_url | text | YES |

### `neighborhoods` (15 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| name | text | NO |
| slug | text | NO |
| area_id | uuid | NO |
| description | text | YES |
| tagline | text | YES |
| hero_image_url | text | YES |
| map_center_lat | numeric | YES |
| map_center_lng | numeric | YES |
| geojson_key | text | YES |
| is_featured | boolean | NO |
| is_active | boolean | NO |
| sort_order | integer | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `newsletter_posts` (6 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| newsletter_id | uuid | NO |
| post_id | uuid | NO |
| section_id | uuid | YES |
| position | integer | NO |
| created_at | timestamp with time zone | NO |

### `newsletter_sections` (7 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| newsletter_id | uuid | NO |
| section_name | text | NO |
| section_blurb | text | YES |
| section_image_url | text | YES |
| sort_order | integer | NO |
| created_at | timestamp with time zone | NO |

### `newsletter_types` (8 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| name | text | NO |
| slug | text | NO |
| frequency | text | NO |
| send_day | text | YES |
| description | text | YES |
| is_active | boolean | NO |
| created_at | timestamp with time zone | NO |

### `newsletters` (24 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| name | text | NO |
| slug | text | NO |
| issue_date | date | NO |
| issue_slug | text | NO |
| subject_line | character varying | NO |
| preview_text | character varying | YES |
| editor_intro | character varying | YES |
| html_body | text | YES |
| send_provider | text | YES |
| hubspot_email_id | text | YES |
| hubspot_stats_json | jsonb | YES |
| sponsor_business_id | uuid | YES |
| ad_snapshot | jsonb | YES |
| status | text | NO |
| is_public | boolean | YES |
| open_rate | numeric | YES |
| click_rate | numeric | YES |
| send_count | integer | YES |
| google_doc_url | text | YES |
| notes | text | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |
| newsletter_type_id | uuid | NO |

### `organizations` (6 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| name | text | NO |
| slug | text | NO |
| website | text | YES |
| description | text | YES |
| created_at | timestamp with time zone | NO |

### `pillars` (8 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| name | text | NO |
| slug | text | NO |
| description | text | YES |
| sort_order | integer | NO |
| is_active | boolean | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `platform_performance` (17 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| platform | text | NO |
| followers | integer | YES |
| followers_delta | integer | YES |
| subscribers | integer | YES |
| subscribers_delta | integer | YES |
| total_impressions | integer | YES |
| total_interactions | integer | YES |
| total_reach | integer | YES |
| sessions | integer | YES |
| new_contacts | integer | YES |
| total_watch_time_hours | numeric | YES |
| total_video_views | integer | YES |
| measured_at | timestamp with time zone | NO |
| period_start | timestamp with time zone | YES |
| period_end | timestamp with time zone | YES |
| created_at | timestamp with time zone | YES |

### `post_businesses` (5 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| post_id | uuid | NO |
| business_id | uuid | NO |
| mention_type | text | YES |
| created_at | timestamp with time zone | NO |

### `post_categories` (5 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| post_id | uuid | NO |
| category_id | uuid | NO |
| is_primary | boolean | NO |
| created_at | timestamp with time zone | NO |

### `post_events` (5 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| post_id | uuid | NO |
| event_id | uuid | NO |
| mention_type | text | YES |
| created_at | timestamp with time zone | NO |

### `post_images` (10 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| post_id | uuid | NO |
| image_url | text | NO |
| media_asset_id | uuid | YES |
| caption | text | YES |
| alt_text | text | YES |
| credit | text | YES |
| image_role | text | YES |
| sort_order | integer | NO |
| created_at | timestamp with time zone | NO |

### `post_neighborhoods` (5 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| post_id | uuid | NO |
| neighborhood_id | uuid | NO |
| is_primary | boolean | NO |
| created_at | timestamp with time zone | NO |

### `post_source_stories` (4 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| post_id | uuid | NO |
| story_id | uuid | NO |
| created_at | timestamp with time zone | NO |

### `post_sponsors` (6 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| post_id | uuid | NO |
| sponsor_id | uuid | NO |
| tier | text | YES |
| published_at | timestamp with time zone | YES |
| created_at | timestamp with time zone | YES |

### `post_tags` (4 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| post_id | uuid | NO |
| tag_id | uuid | NO |
| created_at | timestamp with time zone | NO |

### `published_content` (12 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| source_story_id | uuid | YES |
| post_id | uuid | YES |
| media_item_id | uuid | YES |
| platform | text | NO |
| content_format | text | NO |
| platform_post_id | text | YES |
| title | text | YES |
| published_url | text | YES |
| published_at | timestamp with time zone | YES |
| created_at | timestamp with time zone | YES |
| updated_at | timestamp with time zone | YES |

### `redirects` (8 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| from_path | text | NO |
| to_path | text | NO |
| status_code | integer | NO |
| is_active | boolean | NO |
| hit_count | integer | NO |
| notes | text | YES |
| created_at | timestamp with time zone | NO |

### `reviews` (20 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| business_id | uuid | NO |
| user_id | uuid | NO |
| rating | integer | NO |
| title | text | YES |
| body | character varying | YES |
| visit_date | date | YES |
| photos | jsonb | YES |
| status | text | NO |
| moderation_notes | text | YES |
| moderated_by | uuid | YES |
| moderated_at | timestamp with time zone | YES |
| rejection_reason | text | YES |
| is_verified_visit | boolean | NO |
| helpful_count | integer | NO |
| reported_count | integer | NO |
| auto_flagged | boolean | NO |
| published_at | timestamp with time zone | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `saved_items` (5 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| user_id | uuid | NO |
| entity_type | text | NO |
| entity_id | uuid | NO |
| created_at | timestamp with time zone | NO |

### `script_batches` (7 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| week_of | date | NO |
| batch_name | text | YES |
| status | text | NO |
| notes | text | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `scripts` (21 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| script_batch_id | uuid | YES |
| story_id | uuid | YES |
| title | text | NO |
| script_text | text | YES |
| platform | text | YES |
| format | text | YES |
| pillar_id | uuid | YES |
| neighborhood_id | uuid | YES |
| hashtags | text | YES |
| call_to_action | text | YES |
| status | text | NO |
| scheduled_date | date | YES |
| posted_at | timestamp with time zone | YES |
| post_url | text | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |
| slug | text | YES |
| tags | text | YES |
| caption | text | YES |
| description | text | YES |

### `seo_content_calendar` (16 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| title_idea | text | NO |
| token_name | text | YES |
| type | text | YES |
| category_id | uuid | YES |
| pillar_id | uuid | YES |
| neighborhood_id | uuid | YES |
| target_keywords | text | YES |
| seasonality | text | YES |
| best_publish_months | jsonb | YES |
| status | text | NO |
| post_id | uuid | YES |
| content_index_id | uuid | YES |
| notes | text | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `sponsors` (23 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| business_id | uuid | YES |
| sponsor_name | text | NO |
| contact_name | text | YES |
| contact_email | text | YES |
| contact_phone | text | YES |
| campaign_name | text | YES |
| campaign_start | date | YES |
| campaign_end | date | YES |
| campaign_value | numeric | YES |
| placement | jsonb | YES |
| talking_points | text | YES |
| content_index_id | uuid | YES |
| status | text | NO |
| notes | text | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |
| package_type | text | YES |
| placements_total | integer | YES |
| placements_used | integer | YES |
| category_focus | uuid | YES |
| neighborhood_focus | uuid | YES |
| is_active | boolean | YES |

### `stories` (30 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| headline | text | NO |
| source_url | text | YES |
| source_name | text | YES |
| summary | text | YES |
| pillar_id | uuid | YES |
| city_id | uuid | YES |
| category_id | uuid | YES |
| priority | text | NO |
| image_url | text | YES |
| eligible_for_blog | boolean | NO |
| eligible_for_script | boolean | NO |
| assigned_blog | boolean | NO |
| assigned_script | boolean | NO |
| used_in_blog | boolean | NO |
| used_in_script | boolean | NO |
| used_in_blog_at | timestamp with time zone | YES |
| used_in_script_at | timestamp with time zone | YES |
| status | text | NO |
| published_at | timestamp with time zone | YES |
| ingested_at | timestamp with time zone | NO |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |
| score | integer | YES |
| tier | text | YES |
| neighborhood_id | uuid | YES |
| angle_summary | text | YES |
| expires_at | timestamp with time zone | YES |
| banked_at | timestamp with time zone | YES |
| reuse_eligible_at | timestamp with time zone | YES |

### `story_businesses` (4 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| story_id | uuid | NO |
| business_id | uuid | NO |
| created_at | timestamp with time zone | YES |

### `story_neighborhoods` (5 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| story_id | uuid | NO |
| neighborhood_id | uuid | NO |
| created_at | timestamp with time zone | NO |
| is_primary | boolean | YES |

### `submissions` (15 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| submission_type | text | NO |
| submitted_by | uuid | YES |
| submitter_name | text | NO |
| submitter_email | text | NO |
| submitter_phone | text | YES |
| data | jsonb | NO |
| status | text | NO |
| reviewer_notes | text | YES |
| reviewed_by | uuid | YES |
| reviewed_at | timestamp with time zone | YES |
| rejection_reason | text | YES |
| created_record_id | uuid | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `subscriptions` (19 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| business_id | uuid | NO |
| user_id | uuid | NO |
| stripe_customer_id | text | YES |
| stripe_subscription_id | text | YES |
| plan | text | NO |
| price_monthly | numeric | YES |
| billing_cycle | text | YES |
| status | text | NO |
| current_period_start | date | YES |
| current_period_end | date | YES |
| cancel_at_period_end | boolean | NO |
| canceled_at | timestamp with time zone | YES |
| trial_start | date | YES |
| trial_end | date | YES |
| grace_period_days | integer | YES |
| downgrade_scheduled_at | timestamp with time zone | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `system_logs` (14 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| scenario | text | NO |
| severity | text | NO |
| message | text | NO |
| story_id | uuid | YES |
| post_id | uuid | YES |
| media_item_id | uuid | YES |
| published_content_id | uuid | YES |
| platform | text | YES |
| raw_error | text | YES |
| resolved | boolean | YES |
| resolved_at | timestamp with time zone | YES |
| resolved_by | text | YES |
| created_at | timestamp with time zone | YES |

### `tags` (6 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| name | text | NO |
| slug | text | NO |
| description | text | YES |
| created_at | timestamp with time zone | NO |
| is_active | boolean | YES |

### `tier_changes` (11 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| business_id | uuid | NO |
| subscription_id | uuid | YES |
| change_type | text | NO |
| from_tier | text | NO |
| to_tier | text | NO |
| reason | text | YES |
| triggered_by | text | NO |
| admin_user_id | uuid | YES |
| notes | text | YES |
| created_at | timestamp with time zone | NO |

### `tier_visibility_rules` (6 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| tier | text | NO |
| field_name | text | NO |
| visible | boolean | NO |
| notes | text | YES |
| created_at | timestamp with time zone | NO |

### `trending_topics` (7 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| keyword | text | NO |
| mention_count | integer | YES |
| first_seen | timestamp with time zone | YES |
| last_seen | timestamp with time zone | YES |
| is_active | boolean | YES |
| created_at | timestamp with time zone | YES |

### `users` (14 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| email | text | NO |
| display_name | text | YES |
| avatar_url | text | YES |
| role | text | NO |
| phone | text | YES |
| bio | text | YES |
| city_id | uuid | YES |
| neighborhood_id | uuid | YES |
| email_verified | boolean | NO |
| is_active | boolean | NO |
| last_login_at | timestamp with time zone | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `watchlist` (20 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| project_name | text | NO |
| slug | text | NO |
| location | text | YES |
| neighborhood_id | uuid | YES |
| city_id | uuid | YES |
| status | text | NO |
| developer | text | YES |
| project_type | jsonb | YES |
| units | integer | YES |
| square_feet | integer | YES |
| estimated_cost | numeric | YES |
| timeline | text | YES |
| description | text | YES |
| last_update | text | YES |
| next_milestone | text | YES |
| latitude | numeric | YES |
| longitude | numeric | YES |
| created_at | timestamp with time zone | NO |
| updated_at | timestamp with time zone | NO |

### `watchlist_posts` (4 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| watchlist_id | uuid | NO |
| post_id | uuid | NO |
| created_at | timestamp with time zone | NO |

### `watchlist_stories` (4 columns)

| Column | Type | Nullable |
|--------|------|----------|
| id | uuid | NO |
| watchlist_id | uuid | NO |
| story_id | uuid | NO |
| created_at | timestamp with time zone | NO |

