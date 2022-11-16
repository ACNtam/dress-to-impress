--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Homebrew)
-- Dumped by pg_dump version 14.5 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: profile; Type: TABLE; Schema: public; Owner: tpl522_1
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    industry character varying(50) NOT NULL,
    occupation character varying(50) NOT NULL,
    style character varying(200) NOT NULL,
    occassion character varying(200) NOT NULL,
    user_email character(500),
    gender character varying(50) NOT NULL
);


ALTER TABLE public.profile OWNER TO tpl522_1;

--
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_1
--

CREATE SEQUENCE public.profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profile_id_seq OWNER TO tpl522_1;

--
-- Name: profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_1
--

ALTER SEQUENCE public.profile_id_seq OWNED BY public.profile.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl522_1
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    sub text
);


ALTER TABLE public.users OWNER TO tpl522_1;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_1
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tpl522_1;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_1
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: profile id; Type: DEFAULT; Schema: public; Owner: tpl522_1
--

ALTER TABLE ONLY public.profile ALTER COLUMN id SET DEFAULT nextval('public.profile_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tpl522_1
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: tpl522_1
--

INSERT INTO public.profile (id, industry, occupation, style, occassion, user_email, gender) VALUES (5, 'Fashion', 'Stylist', 'vintage', 'hike', 'alice.ntam@gmail.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ', 'Female');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl522_1
--

INSERT INTO public.users (id, username, email, sub) VALUES (1, 'AliChu', 'alice.ntam@gmail.com', NULL);
INSERT INTO public.users (id, username, email, sub) VALUES (4, 'alicec.ntam', 'alicec.ntam@gmail.com', 'google-oauth2|104434624274144377046');


--
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_1
--

SELECT pg_catalog.setval('public.profile_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_1
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: profile profile_occupation_key; Type: CONSTRAINT; Schema: public; Owner: tpl522_1
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_occupation_key UNIQUE (occupation);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_1
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


--
-- Name: profile profile_style_key; Type: CONSTRAINT; Schema: public; Owner: tpl522_1
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_style_key UNIQUE (style);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: tpl522_1
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_1
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: profile profile_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl522_1
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_user_id_fkey FOREIGN KEY (user_email) REFERENCES public.users(email) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

