# Issue #24: Cambio de encabezado

## Overview
Modificar el texto del encabezado principal de la aplicación de "Todo App" a "Todo App by CJI".

## Problem Statement
El encabezado actual muestra "Todo App" pero el usuario necesita que se muestre "Todo App by CJI" para agregar atribución o branding personalizado.

## Proposed Solution
Localizar el componente de encabezado existente y actualizar el texto del título de "Todo App" a "Todo App by CJI". Este es un cambio simple de contenido que no requiere modificaciones estructurales ni de estilos.

## Technical Requirements
- Identificar el componente que contiene el encabezado "Todo App"
- Actualizar el texto del encabezado manteniendo los estilos existentes
- Asegurar que el cambio se refleje en todas las páginas donde aparece el encabezado
- No modificar estilos, estructura, o funcionalidad existente

## Implementation Details

### Components to Create/Modify
- **Path:** `src/components/Header.tsx` (o el archivo donde esté definido el header)
  - Purpose: Componente que muestra el encabezado de la aplicación
  - Changes: Cambiar el texto de "Todo App" a "Todo App by CJI" en el elemento correspondiente (h1, h2, o el tag HTML que se esté usando)

### Dependencies
- No se requieren nuevas dependencias

## Acceptance Criteria
- [ ] El encabezado de la aplicación muestra "Todo App by CJI" en lugar de "Todo App"
- [ ] Los estilos del encabezado permanecen idénticos (tamaño, color, alineación, etc.)
- [ ] El cambio es visible en todas las páginas de la aplicación
- [ ] No se han introducido errores de TypeScript
- [ ] No se han roto tests existentes

## Testing Strategy
- **Unit Tests:** 
  - Actualizar el test del componente Header para verificar que el texto sea "Todo App by CJI"
  - Verificar que el snapshot test se actualice correctamente si existe uno
- **Integration Tests:** 
  - No aplica para este cambio
- **Manual Testing:** 
  1. Iniciar la aplicación en modo desarrollo
  2. Verificar que el encabezado muestre "Todo App by CJI"
  3. Navegar por diferentes páginas (si las hay) y confirmar que el encabezado sea consistente
  4. Verificar en diferentes viewports (mobile, tablet, desktop)

## Edge Cases
- Si el texto del encabezado está definido en múltiples lugares (constantes, archivos de configuración, etc.), asegurar que se actualice en todos los lugares relevantes
- Si existe internacionalización (i18n), verificar si el texto debe actualizarse en archivos de traducción
- Verificar que el texto más largo no rompa el layout en viewports pequeños (aunque "by CJI" es corto, validar visualmente)

## Out of Scope
- Cambios en el diseño o estilos del encabezado
- Modificaciones en la funcionalidad del componente Header
- Cambios en otros textos o componentes de la aplicación
- Agregar enlaces o funcionalidad adicional relacionada con "CJI"