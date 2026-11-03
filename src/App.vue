<script setup lang="ts">
import CosmicBackground from './components/layout/CosmicBackground.vue'
import SectionDots from './components/layout/SectionDots.vue'
import SocialRail from './components/layout/SocialRail.vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheIntro from './components/layout/TheIntro.vue'
import WarpTransition from './components/layout/WarpTransition.vue'
import WhatsAppFab from './components/layout/WhatsAppFab.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import EducationSection from './components/sections/EducationSection.vue'
import ExperienceSection from './components/sections/ExperienceSection.vue'
import HeroSection from './components/sections/HeroSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip">
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>

    <CosmicBackground />
    <TheIntro />
    <TheHeader />
    <SocialRail />
    <SectionDots />

    <main id="conteudo" tabindex="-1" class="outline-none">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>

    <WarpTransition />
    <WhatsAppFab />
  </div>
</template>
