--
-- PostgreSQL database dump
--

\restrict giO4WG4o8g6Xw1LxThh7bAeLzuZERjSAhfZo2RynJkyba99Aizcgmxp7PXGdU7b

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg13+2)
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_role_id_foreign;
ALTER TABLE IF EXISTS ONLY public.pictures DROP CONSTRAINT IF EXISTS pictures_menu_id_foreign;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_menu_id_foreign;
ALTER TABLE IF EXISTS ONLY public.order_status_histories DROP CONSTRAINT IF EXISTS order_status_histories_order_id_foreign;
ALTER TABLE IF EXISTS ONLY public.notices DROP CONSTRAINT IF EXISTS notices_order_id_foreign;
ALTER TABLE IF EXISTS ONLY public.menus DROP CONSTRAINT IF EXISTS menus_theme_id_foreign;
ALTER TABLE IF EXISTS ONLY public.menus DROP CONSTRAINT IF EXISTS menus_diet_id_foreign;
ALTER TABLE IF EXISTS ONLY public.dish_menus DROP CONSTRAINT IF EXISTS dish_menus_menu_id_foreign;
ALTER TABLE IF EXISTS ONLY public.dish_menus DROP CONSTRAINT IF EXISTS dish_menus_dish_id_foreign;
ALTER TABLE IF EXISTS ONLY public.dish_allergens DROP CONSTRAINT IF EXISTS dish_allergens_dish_id_foreign;
ALTER TABLE IF EXISTS ONLY public.dish_allergens DROP CONSTRAINT IF EXISTS dish_allergens_allergen_id_foreign;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_unique;
ALTER TABLE IF EXISTS ONLY public.themes DROP CONSTRAINT IF EXISTS themes_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_label_unique;
ALTER TABLE IF EXISTS ONLY public.pictures DROP CONSTRAINT IF EXISTS pictures_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_order_number_unique;
ALTER TABLE IF EXISTS ONLY public.order_status_histories DROP CONSTRAINT IF EXISTS order_status_histories_pkey;
ALTER TABLE IF EXISTS ONLY public.opening_hours DROP CONSTRAINT IF EXISTS opening_hours_pkey;
ALTER TABLE IF EXISTS ONLY public.notices DROP CONSTRAINT IF EXISTS notices_pkey;
ALTER TABLE IF EXISTS ONLY public.menus DROP CONSTRAINT IF EXISTS menus_pkey;
ALTER TABLE IF EXISTS ONLY public.dishes DROP CONSTRAINT IF EXISTS dishes_pkey;
ALTER TABLE IF EXISTS ONLY public.dish_menus DROP CONSTRAINT IF EXISTS dish_menus_pkey;
ALTER TABLE IF EXISTS ONLY public.dish_allergens DROP CONSTRAINT IF EXISTS dish_allergens_pkey;
ALTER TABLE IF EXISTS ONLY public.diets DROP CONSTRAINT IF EXISTS diets_pkey;
ALTER TABLE IF EXISTS ONLY public.allergens DROP CONSTRAINT IF EXISTS allergens_pkey;
ALTER TABLE IF EXISTS ONLY public.adonis_schema_versions DROP CONSTRAINT IF EXISTS adonis_schema_versions_pkey;
ALTER TABLE IF EXISTS ONLY public.adonis_schema DROP CONSTRAINT IF EXISTS adonis_schema_pkey;
ALTER TABLE IF EXISTS public.adonis_schema ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.themes;
DROP TABLE IF EXISTS public.roles;
DROP TABLE IF EXISTS public.pictures;
DROP TABLE IF EXISTS public.orders;
DROP TABLE IF EXISTS public.order_status_histories;
DROP TABLE IF EXISTS public.opening_hours;
DROP TABLE IF EXISTS public.notices;
DROP TABLE IF EXISTS public.menus;
DROP TABLE IF EXISTS public.dishes;
DROP TABLE IF EXISTS public.dish_menus;
DROP TABLE IF EXISTS public.dish_allergens;
DROP TABLE IF EXISTS public.diets;
DROP TABLE IF EXISTS public.allergens;
DROP TABLE IF EXISTS public.adonis_schema_versions;
DROP SEQUENCE IF EXISTS public.adonis_schema_id_seq;
DROP TABLE IF EXISTS public.adonis_schema;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: adonis_schema; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.adonis_schema (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    batch integer NOT NULL,
    migration_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: adonis_schema_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.adonis_schema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: adonis_schema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.adonis_schema_id_seq OWNED BY public.adonis_schema.id;


--
-- Name: adonis_schema_versions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.adonis_schema_versions (
    version integer NOT NULL
);


--
-- Name: allergens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.allergens (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    label character varying(50) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: diets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.diets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    label character varying(50) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: dish_allergens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dish_allergens (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    dish_id uuid,
    allergen_id uuid,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: dish_menus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dish_menus (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    dish_id uuid,
    menu_id uuid,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: dishes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dishes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying(100) NOT NULL,
    type character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    photo_path character varying(255) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: menus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menus (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying(100) NOT NULL,
    description character varying(255) NOT NULL,
    min_people integer NOT NULL,
    price_per_people numeric(10,2) NOT NULL,
    conditions character varying(255),
    stock integer NOT NULL,
    diet_id uuid,
    theme_id uuid,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: notices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notices (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id uuid,
    note integer NOT NULL,
    description character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: opening_hours; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.opening_hours (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    day_of_week integer NOT NULL,
    open_time time without time zone,
    close_time time without time zone,
    is_closed boolean DEFAULT false,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: order_status_histories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_status_histories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id uuid,
    status character varying(255) NOT NULL,
    changed_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    menu_id uuid,
    user_id uuid,
    order_number character varying(255) NOT NULL,
    order_date timestamp with time zone NOT NULL,
    event_date date NOT NULL,
    delivery_time time without time zone NOT NULL,
    delivery_address character varying(255) NOT NULL,
    delivery_city character varying(255) NOT NULL,
    delivery_zipcode character varying(255) NOT NULL,
    number_of_people integer NOT NULL,
    menu_price numeric(8,2) NOT NULL,
    reduction_amount numeric(8,2) DEFAULT '0'::numeric NOT NULL,
    total_amount numeric(8,2) NOT NULL,
    delivery_fees numeric(8,2) NOT NULL,
    status character varying(255) NOT NULL,
    cancellation_reason character varying(255),
    contact_mode character varying(255),
    material_loan boolean DEFAULT false,
    material_return boolean DEFAULT true,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: pictures; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pictures (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    menu_id uuid,
    image_path character varying(255) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    label character varying(255) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: themes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.themes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    label character varying(50) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    role_id uuid,
    lastname character varying(100) NOT NULL,
    firstname character varying(100) NOT NULL,
    email character varying(254) NOT NULL,
    password character varying(254) NOT NULL,
    phone character varying(254),
    address character varying(254),
    city character varying(100),
    country character varying(100),
    password_change boolean DEFAULT false NOT NULL,
    password_reset boolean DEFAULT false NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);


--
-- Name: adonis_schema id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.adonis_schema ALTER COLUMN id SET DEFAULT nextval('public.adonis_schema_id_seq'::regclass);


--
-- Name: adonis_schema adonis_schema_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.adonis_schema
    ADD CONSTRAINT adonis_schema_pkey PRIMARY KEY (id);


--
-- Name: adonis_schema_versions adonis_schema_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.adonis_schema_versions
    ADD CONSTRAINT adonis_schema_versions_pkey PRIMARY KEY (version);


--
-- Name: allergens allergens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allergens
    ADD CONSTRAINT allergens_pkey PRIMARY KEY (id);


--
-- Name: diets diets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.diets
    ADD CONSTRAINT diets_pkey PRIMARY KEY (id);


--
-- Name: dish_allergens dish_allergens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dish_allergens
    ADD CONSTRAINT dish_allergens_pkey PRIMARY KEY (id);


--
-- Name: dish_menus dish_menus_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dish_menus
    ADD CONSTRAINT dish_menus_pkey PRIMARY KEY (id);


--
-- Name: dishes dishes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dishes
    ADD CONSTRAINT dishes_pkey PRIMARY KEY (id);


--
-- Name: menus menus_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_pkey PRIMARY KEY (id);


--
-- Name: notices notices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notices
    ADD CONSTRAINT notices_pkey PRIMARY KEY (id);


--
-- Name: opening_hours opening_hours_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opening_hours
    ADD CONSTRAINT opening_hours_pkey PRIMARY KEY (id);


--
-- Name: order_status_histories order_status_histories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_status_histories
    ADD CONSTRAINT order_status_histories_pkey PRIMARY KEY (id);


--
-- Name: orders orders_order_number_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_order_number_unique UNIQUE (order_number);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: pictures pictures_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pictures
    ADD CONSTRAINT pictures_pkey PRIMARY KEY (id);


--
-- Name: roles roles_label_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_label_unique UNIQUE (label);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: themes themes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: dish_allergens dish_allergens_allergen_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dish_allergens
    ADD CONSTRAINT dish_allergens_allergen_id_foreign FOREIGN KEY (allergen_id) REFERENCES public.allergens(id) ON DELETE CASCADE;


--
-- Name: dish_allergens dish_allergens_dish_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dish_allergens
    ADD CONSTRAINT dish_allergens_dish_id_foreign FOREIGN KEY (dish_id) REFERENCES public.dishes(id) ON DELETE CASCADE;


--
-- Name: dish_menus dish_menus_dish_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dish_menus
    ADD CONSTRAINT dish_menus_dish_id_foreign FOREIGN KEY (dish_id) REFERENCES public.dishes(id) ON DELETE CASCADE;


--
-- Name: dish_menus dish_menus_menu_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dish_menus
    ADD CONSTRAINT dish_menus_menu_id_foreign FOREIGN KEY (menu_id) REFERENCES public.menus(id) ON DELETE CASCADE;


--
-- Name: menus menus_diet_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_diet_id_foreign FOREIGN KEY (diet_id) REFERENCES public.diets(id) ON DELETE RESTRICT;


--
-- Name: menus menus_theme_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_theme_id_foreign FOREIGN KEY (theme_id) REFERENCES public.themes(id) ON DELETE RESTRICT;


--
-- Name: notices notices_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notices
    ADD CONSTRAINT notices_order_id_foreign FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_status_histories order_status_histories_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_status_histories
    ADD CONSTRAINT order_status_histories_order_id_foreign FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: orders orders_menu_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_menu_id_foreign FOREIGN KEY (menu_id) REFERENCES public.menus(id) ON DELETE CASCADE;


--
-- Name: orders orders_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: pictures pictures_menu_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pictures
    ADD CONSTRAINT pictures_menu_id_foreign FOREIGN KEY (menu_id) REFERENCES public.menus(id) ON DELETE CASCADE;


--
-- Name: users users_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict giO4WG4o8g6Xw1LxThh7bAeLzuZERjSAhfZo2RynJkyba99Aizcgmxp7PXGdU7b


--
-- PostgreSQL database dump
--

\restrict HVbZWtZwaXPEC0AC8ET4gc9TMcS1Atjp7wYdvEZZBfQFjSz7wSzpu5XQzjF4ibz

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg13+2)
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: adonis_schema; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.adonis_schema (id, name, batch, migration_time) FROM stdin;
1	database/migrations/1761135277160_create_roles_table	1	2026-06-18 09:16:10.82252+00
3	database/migrations/1781681161731_create_themes_table	1	2026-06-18 09:16:10.861605+00
4	database/migrations/1781681254208_create_diets_table	1	2026-06-18 09:16:10.866689+00
5	database/migrations/1781681280193_create_allergens_table	1	2026-06-18 09:16:10.871024+00
6	database/migrations/1781683535705_create_menus_table	1	2026-06-18 09:16:10.875087+00
7	database/migrations/1781684340295_create_dishes_table	1	2026-06-18 09:16:10.881988+00
8	database/migrations/1781684647559_create_dish_menus_table	1	2026-06-18 09:16:10.887238+00
9	database/migrations/1781684654395_create_dish_allergens_table	1	2026-06-18 09:16:10.893747+00
10	database/migrations/1781695382219_create_pictures_table	1	2026-06-18 09:16:10.90123+00
15	database/migrations/1761885935168_create_users_table	2	2026-06-20 16:43:13.021123+00
16	database/migrations/1781961412086_create_orders_table	2	2026-06-20 16:43:13.075948+00
19	database/migrations/1782113134549_create_order_status_histories_table	3	2026-06-22 07:30:28.747544+00
20	database/migrations/1782142301425_create_notices_table	4	2026-06-22 15:34:15.994709+00
22	database/migrations/1782285734012_create_opening_hours_table	5	2026-06-24 07:27:42.148646+00
\.


--
-- Name: adonis_schema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.adonis_schema_id_seq', 22, true);


--
-- PostgreSQL database dump complete
--

\unrestrict HVbZWtZwaXPEC0AC8ET4gc9TMcS1Atjp7wYdvEZZBfQFjSz7wSzpu5XQzjF4ibz

--
-- PostgreSQL database dump
--

\restrict jMABKohXyFaH0k6Yh6NysdftV493p7VoqoBnDhut2m8hKEbqYJcbR4HA8ho5uFm

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg13+2)
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: adonis_schema_versions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.adonis_schema_versions (version) FROM stdin;
2
\.


--
-- PostgreSQL database dump complete
--

\unrestrict jMABKohXyFaH0k6Yh6NysdftV493p7VoqoBnDhut2m8hKEbqYJcbR4HA8ho5uFm
