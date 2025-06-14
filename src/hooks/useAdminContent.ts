
import { useState, useEffect } from 'react';
import { SiteContent, defaultContent } from '@/types/admin';

export const useAdminContent = () => {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent);
      // וודא שכל המערכים קיימים
      if (!parsedContent.achievements || !Array.isArray(parsedContent.achievements)) {
        parsedContent.achievements = defaultContent.achievements;
      }
      if (!parsedContent.services || !Array.isArray(parsedContent.services)) {
        parsedContent.services = defaultContent.services;
      }
      setContent(parsedContent);
    }
  }, []);

  const saveContent = () => {
    localStorage.setItem('siteContent', JSON.stringify(content));
    window.dispatchEvent(new CustomEvent('contentUpdated', { detail: content }));
  };

  const updateHero = (field: keyof SiteContent['hero'], value: string) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateAbout = (field: keyof SiteContent['about'], value: string) => {
    setContent(prev => ({
      ...prev,
      about: { ...prev.about, [field]: value }
    }));
  };

  const updateContact = (field: keyof SiteContent['contact'], value: string) => {
    setContent(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const updateAchievements = (achievements: SiteContent['achievements']) => {
    setContent(prev => ({
      ...prev,
      achievements
    }));
  };

  const updateServices = (services: SiteContent['services']) => {
    setContent(prev => ({
      ...prev,
      services
    }));
  };

  const addArticle = (newArticle: { title: string; excerpt: string; date: string; category: string }) => {
    const article = {
      ...newArticle,
      id: Date.now().toString(),
      date: newArticle.date || new Date().toLocaleDateString('he-IL')
    };

    setContent(prev => ({
      ...prev,
      articles: [article, ...prev.articles]
    }));
  };

  const deleteArticle = (id: string) => {
    setContent(prev => ({
      ...prev,
      articles: prev.articles.filter(article => article.id !== id)
    }));
  };

  return {
    content,
    saveContent,
    updateHero,
    updateAbout,
    updateContact,
    updateAchievements,
    updateServices,
    addArticle,
    deleteArticle
  };
};
