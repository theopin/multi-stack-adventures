export const RolePermissions = [
    { role: 'admin', resource: 'account', action: 'create:any'},
    { role: 'admin', resource: 'account', action: 'read:any'},
    { role: 'admin', resource: 'account', action: 'update:any'},
    { role: 'admin', resource: 'account', action: 'delete:any'},
 
    { role: 'user', resource: 'account', action: 'create:own'},
    { role: 'user', resource: 'account', action: 'read:own'},
    { role: 'user', resource: 'account', action: 'update:own'},
    { role: 'user', resource: 'account', action: 'delete:own'}
];