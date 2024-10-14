// In App.js

<Routes>
  <Route path="/" element={<Layout />}>
    {/* Public Routes */}
    <Route
      path="login"
      element={
        <BlockRoutes>
          <LoginForm />
        </BlockRoutes>
      }
    />
    <Route
      path="register"
      element={
        <BlockRoutes>
          <SignUpForm />
        </BlockRoutes>
      }
    />
    <Route path="linkpage" element={<LinkPage />} />
    <Route path="unauthorized" element={<Unauthorized />} />
    <Route path="/" index element={<Home />} />

    {/* Protected Routes - Role-based access */}
    <Route element={<RequireAuth allowedRoles={["driver"]} />}>
      <Route path="driver" element={<Driver />} />
    </Route>

    <Route element={<RequireAuth allowedRoles={["maintainer"]} />}>
      <Route
        path="maintainer"
        element={
          <AppointmentProvider>
            <Maintainer />
          </AppointmentProvider>
        }
      />
    </Route>

    <Route path="*" element={<Missing />} />
  </Route>
</Routes>;
