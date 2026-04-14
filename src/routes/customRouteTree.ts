/* Custom route tree combining generated root with new file routes.
   This is intentionally separate so the generated `routeTree.gen.ts` is not modified by hand.
*/

import { Route as rootRouteImport } from './__root';
import { Route as IndexRouteImport } from './index';
import { Route as AboutRouteImport } from './about';
import { Route as ServicesRouteImport } from './services';
import { Route as ProjectsRouteImport } from './projects';
import { Route as TeamRouteImport } from './team';
import { Route as BlogRouteImport } from './blog';
import { Route as ContactRouteImport } from './contact';
import { Route as PrivacyRouteImport } from './privacy';
import { Route as TermsRouteImport } from './terms';

const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any);
const AboutRoute = AboutRouteImport.update({ id: '/about', path: '/about', getParentRoute: () => rootRouteImport } as any);
const ServicesRoute = ServicesRouteImport.update({ id: '/services', path: '/services', getParentRoute: () => rootRouteImport } as any);
const ProjectsRoute = ProjectsRouteImport.update({ id: '/projects', path: '/projects', getParentRoute: () => rootRouteImport } as any);
const TeamRoute = TeamRouteImport.update({ id: '/team', path: '/team', getParentRoute: () => rootRouteImport } as any);
const BlogRoute = BlogRouteImport.update({ id: '/blog', path: '/blog', getParentRoute: () => rootRouteImport } as any);
const ContactRoute = ContactRouteImport.update({ id: '/contact', path: '/contact', getParentRoute: () => rootRouteImport } as any);
const PrivacyRoute = PrivacyRouteImport.update({ id: '/privacy', path: '/privacy', getParentRoute: () => rootRouteImport } as any);
const TermsRoute = TermsRouteImport.update({ id: '/terms', path: '/terms', getParentRoute: () => rootRouteImport } as any);

const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ServicesRoute,
  ProjectsRoute,
  TeamRoute,
  BlogRoute,
  ContactRoute,
  PrivacyRoute,
  TermsRoute,
};

export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren);
