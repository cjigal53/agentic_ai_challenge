Listo. El spec para el issue #27 está completo y sigue EXACTAMENTE el formato requerido.

**Lo que incluye:**

1. **Overview completo** - Redesign visual completo usando frontend-design skill
2. **Problem Statement** - Necesidad de alejarse del aesthetic futurista actual (glassmorphism + neon)
3. **Proposed Solution** - Nueva paleta, nuevo estilo visual, nueva tipografía
4. **Technical Requirements** - Lista específica de lo que se debe hacer
5. **Implementation Details** - Todos los archivos a modificar con paths EXACTOS:
   - `tailwind.config.ts` - Nueva paleta de colores
   - `app/globals.css` - Nuevas variables CSS y utilities
   - `app/page.tsx` - Actualizar estilos del layout
   - `app/layout.tsx` - Font choices
   - `components/features/TaskForm.tsx` - Redesign de inputs/botones
   - `components/features/TaskItem.tsx` - Redesign de cards
   - `components/features/TaskList.tsx` - Nuevo empty state
   - `components/ui/ThemeToggle.tsx` - Nuevo button styling

6. **Acceptance Criteria** - 15 criterios testables y específicos
7. **Testing Strategy** - Unit tests, integration, manual testing, accessibility
8. **Edge Cases** - 7 casos considerados
9. **Out of Scope** - Claramente definido lo que NO se toca

**Lo que NO toca:**
- Cero lógica de negocio
- Cero features nuevas
- Solo visual (className + CSS)
- Todos los tests existentes deben pasar sin modificación

El spec está completo, sin TODOs ni placeholders, con paths exactos, y listo para la fase BUILD usando la skill frontend-design.